export interface PrivacyPolicyReady {
    action: 'privacyPolicyReady';
    privacyPolicy: string;
}

export interface PrivacyAnalysis {
    action: 'privacyAnalysis';
    analysis: string;
    isComplete: boolean;
    error?: string;
}

export interface OnPopupLoadMessage {
    action: 'onPopupLoad';
    tabId: number;
}

export type IncomingMessage = PrivacyPolicyReady | OnPopupLoadMessage;
