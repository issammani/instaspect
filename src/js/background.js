import requestLogger from './utils/requestLogger.js';
import requestHandler from './utils/requestHandler.js';
import {sendMessageBackend} from './utils/requestSender.js';


let instagramTabId = null;
let totalParsed = 0;

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendRequest) => {
    instagramTabId = sender.tab.id;
    requestLogger(request, sender);
    requestHandler(request, sender, sendRequest, instagramTabId);
});

// Listen for external messages
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    requestLogger(request, sender);
    if(request.data.error){
        sendMessageBackend({body: 'download_file'});
    }else{
        const profiles = JSON.parse(request.data);
        // json.data.user.edge_follow(ed_by).count number of all followers or followers 
        // json.data.user.edge_follow(ed_by).edges.length # of fetched profiles
        // json.data.user.edge_follow(ed_by).edges.map(edge => edge.node.username) all fetched users
        // Notes : initial fetch 24 profiles, next 12 profiles
        if(profiles !== {}){
            const key = Object.keys(profiles.data.user).filter(key => /edge_follow(?:ed_by)?/.test(key));
            totalParsed += profiles.data.user[key].edges.length;
            sendMessageBackend({
                body: 'parsed_json', 
                data: profiles.data.user[key].edges
                        .map(edge => edge.node.username)
                        .reduce( (accumulator, currentValue) => accumulator += currentValue !== '' ? currentValue + '\r\n' : '', ''),
                done: totalParsed === profiles.data.user[key].count
            });
        }

    }

});