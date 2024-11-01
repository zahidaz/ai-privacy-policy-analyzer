import { PrivacyAnalysis } from './types';
import * as ai from './ai';

let engineLoaded = false;

async function loadEngine() {
    if (!engineLoaded) {
        await ai.loadEngine(
            () => console.log("Engine loaded in worker"),
            (report: any) => console.log(`Engine loading: ${report.text} (${report.progress}%)`)
        );
        engineLoaded = true;
    }
}

self.onmessage = async function(event: MessageEvent) {
    const { action, tabId, privacyPolicy } = event.data;

    if (action === 'analyzePrivacyPolicy') {
        await loadEngine();
        try {
            for await (const incrementalResponse of ai.chatStream(privacyPolicy)) {
                const analysisData: PrivacyAnalysis = {
                    action: 'privacyAnalysis',
                    analysis: incrementalResponse,
                    isComplete: false
                };
                postMessage({
                    tabId,
                    action: 'privacyAnalysis',
                    data: analysisData
                });
            }
            const analysisCompleteData: PrivacyAnalysis = {
                action: 'privacyAnalysis',
                analysis: 'Analysis complete.',
                isComplete: true
            };
            postMessage({
                tabId,
                action: 'privacyAnalysis',
                data: analysisCompleteData
            });
        } catch (error: any) {
            const errorData: PrivacyAnalysis = {
                action: 'privacyAnalysis',
                analysis: '',
                isComplete: true,
                error: error.message
            };
            postMessage({
                tabId,
                action: 'privacyAnalysis',
                data: errorData
            });
        }
    }
};
