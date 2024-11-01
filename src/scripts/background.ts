import * as ai from "./ai";

console.log("Background script loaded");

let engineLoadPromise: Promise<void>;

const analyses: Record<number, PrivacyAnalysis> = {}; // tabId -> analysis
const popupPorts: Record<number, chrome.runtime.Port> = {}; // tabId -> port

function loadEngine(): Promise<void> {
    if (!engineLoadPromise) {
        console.log("Loading engine");
        engineLoadPromise = ai.loadEngine(
            () => console.log("Engine loaded"),
            (report) => console.log(`Engine loading: ${report.text} (${report.progress}%)`)
        ).catch((error) => {
            console.error("Failed to load engine:", error);
            throw error;
        });
    }
    return engineLoadPromise;
}

loadEngine().catch((error) => console.error("Engine failed to load on startup:", error));

interface PrivacyPolicyReady {
    action: 'privacyPolicyReady';
    privacyPolicy: string;
}

interface PrivacyAnalysis {
    action: 'privacyAnalysis';
    analysis: string;
    isComplete: boolean;
    error?: string;
}

interface OnPopupLoadMessage {
    action: 'onPopupLoad';
    tabId: number;
}

type IncomingMessage = PrivacyPolicyReady | OnPopupLoadMessage;

chrome.runtime.onMessage.addListener(
    async (message: IncomingMessage, sender, sendResponse) => {
        const tabId = sender.tab?.id;
        if (!tabId) return sendResponse({ error: "Tab ID not found." });

        if (message.action === 'privacyPolicyReady') {
            const { privacyPolicy } = message;
            
            // if privacy policy is empty, 
            if (!privacyPolicy || privacyPolicy.trim() === "") {
                analyses[tabId] = { action: 'privacyAnalysis', analysis: "No privacy policy found.", isComplete: true };
                if (popupPorts[tabId]) {
                    // Send the initial analysis to the popup
                    popupPorts[tabId].postMessage(analyses[tabId]);
                }
                sendResponse({ success: true });
                return true; // Indicates asynchronous response
            }

            try {
                analyses[tabId] = { action: 'privacyAnalysis', analysis: "", isComplete: false };
                if (popupPorts[tabId]) {
                    // Send the initial analysis to the popup
                    popupPorts[tabId].postMessage(analyses[tabId]);
                }
                await handlePrivacyPolicy(privacyPolicy, tabId);
                sendResponse({ success: true });
            } catch (error: any) {
                console.error("Failed to handle privacy policy:", error);
                sendResponse({ error: error.message });
            }
            return true; // Indicates asynchronous response
        }
    }
);

// Listen for connections from the popup
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onMessage.addListener(function(message: IncomingMessage) {
            if (message.action === 'onPopupLoad') {
                const { tabId } = message;
                popupPorts[tabId] = port;

                port.onDisconnect.addListener(() => {
                    delete popupPorts[tabId];
                });

                if (analyses[tabId]) {
                    // Send the existing analysis to the popup
                    port.postMessage(analyses[tabId]);
                } else {
                  port.postMessage({ error: 'No analysis available for this site.' });
                }
            }
        });
    }
});

async function handlePrivacyPolicy(privacyPolicy: string, tabId: number): Promise<void> {
    console.log(`Starting analysis of the privacy policy for tab ${tabId}`);

    try {
        // Start the analysis for the specific tab
        for await (const incrementalResponse of ai.chatStream(privacyPolicy)) {
            // Update the analysis result for this tab
            analyses[tabId].analysis = incrementalResponse;
            if (popupPorts[tabId]) {
                // Send incremental updates to the popup for this tab
                popupPorts[tabId].postMessage(analyses[tabId]);
            }
        }
        analyses[tabId].isComplete = true;
        if (popupPorts[tabId]) {
            // Notify the popup that analysis is complete for this tab
            popupPorts[tabId].postMessage(analyses[tabId]);
        }
    } catch (error: any) {
        console.error(`Error processing tab ${tabId}:`, error);
        analyses[tabId].error = error.message;
        if (popupPorts[tabId]) {
            // Send the error to the popup for this tab
            popupPorts[tabId].postMessage(analyses[tabId]);
        }
    }
}

// Clean up when the tab is updated or removed
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'loading') {
        delete analyses[tabId];
        if (popupPorts[tabId]) {
            popupPorts[tabId].disconnect();
            delete popupPorts[tabId];
        }
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    delete analyses[tabId];
    if (popupPorts[tabId]) {
        popupPorts[tabId].disconnect();
        delete popupPorts[tabId];
    }
});
