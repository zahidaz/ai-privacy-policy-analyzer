console.log("Popup script loaded");

interface PrivacyAnalysis {
    action: 'privacyAnalysis';
    analysis: string;
    isComplete: boolean;
    error?: string;
}

function handlePrivacyAnalysis(message: PrivacyAnalysis) {
    const analysisElement = document.getElementById('analysis') as HTMLDivElement;
    const statusElement = document.getElementById('status') as HTMLDivElement;
    const errorElement = document.getElementById('error') as HTMLDivElement;

    if (!analysisElement || !statusElement || !errorElement) {
        console.error("Elements not found");
        return;
    }

    if (message.error) {
        // Display the error message
        errorElement.textContent = message.error;
        statusElement.textContent = "Error during analysis.";
        hideSpinner(statusElement);
    } else {
        // Update the analysis text
        analysisElement.textContent = message.analysis;
        statusElement.textContent = message.isComplete ? "Analysis Complete" : "Analyzing...";

        // Show or hide spinner based on analysis completion
        if (!message.isComplete) {
            showSpinner(statusElement);
        } else {
            hideSpinner(statusElement);
        }
    }
}

function showSpinner(statusElement: HTMLDivElement) {
    // Check if spinner already exists
    if (document.querySelector('.spinner')) return;

    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    const bounce1 = document.createElement('div');
    bounce1.className = 'double-bounce1';

    const bounce2 = document.createElement('div');
    bounce2.className = 'double-bounce2';

    spinner.appendChild(bounce1);
    spinner.appendChild(bounce2);

    statusElement.appendChild(spinner);
}

function hideSpinner(statusElement: HTMLDivElement) {
    const spinner = document.querySelector('.spinner');
    if (spinner) {
        spinner.remove();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the active tab's ID
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tabId = tabs[0].id;

        // Establish a connection to the background script
        const port = chrome.runtime.connect({ name: "popup" });

        // Send the onPopupLoad message with the tabId
        port.postMessage({ action: 'onPopupLoad', tabId: tabId });

        // Listen for messages from the background script
        port.onMessage.addListener(function(message) {
            if (message.action === 'privacyAnalysis') {
                handlePrivacyAnalysis(message);
            } else if (message.error) {
                console.error('Error:', message.error);
                const errorElement = document.getElementById('error') as HTMLDivElement;
                if (errorElement) {
                    errorElement.textContent = message.error;
                }
                hideSpinner(document.getElementById('status') as HTMLDivElement);
            }
        });
    });
});
