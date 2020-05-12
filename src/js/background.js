import requestLogger from './utils/requestLogger.js';
import requestHandler from './utils/requestHandler.js';

let instagramTabId = null;

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendRequest) => {
    instagramTabId = sender.tab.id;
    requestLogger(request, sender);
    requestHandler(request, sender, sendRequest, instagramTabId);
});