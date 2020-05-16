import requestLogger from './utils/requestLogger.js';
import requestHandler from './utils/requestHandler.js';
import {sendMessageBackend} from './utils/requestSender.js';


let instagramTabId = null;
const instagramUrl = '.*://www.instagram.com/';

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendRequest) => {
    instagramTabId = sender.tab.id;
    requestLogger(request, sender);
    requestHandler(request, sender, sendRequest, instagramTabId);
});

// Listen for external messages
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    // requestLogger(request, sender);
    console.log('Received bla bla');
    console.log(JSON.parse(request.data));
    // json.data.user.edge_follow.count number of all followers or followers 
    // json.data.user.edge_follow.edges.length # of fetched profiles
    // json.data.user.edge_follow.edges.map(edge => edge.node.username) all fetched users
    // Notes : initial fetch 24 profiles, next 12 profiles
});