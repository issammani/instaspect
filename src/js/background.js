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
    requestLogger(request, sender);
    const profiles = JSON.parse(request.data);

    // json.data.user.edge_follow(ed_by).count number of all followers or followers 
    // json.data.user.edge_follow(ed_by).edges.length # of fetched profiles
    // json.data.user.edge_follow(ed_by).edges.map(edge => edge.node.username) all fetched users
    // Notes : initial fetch 24 profiles, next 12 profiles
    const key = Object.keys(profiles.data.user).filter(key => /edge_follow(?:ed_by)?/.test(key));
    sendMessageBackend({
        body: 'parsed_json', 
        data: profiles.data.user[key].edges
                .map(edge => edge.node.username)
                .reduce( (accumulator, currentValue) => accumulator += currentValue !== '' ? currentValue + '\r\n' : '', '')
    });

});