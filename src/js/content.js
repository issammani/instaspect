import selectors from './utils/selectors.js';
import {isProfile, fetchProfileData} from './utils/instagram.js';
import {sendMessageFrontend} from './utils/requestSender.js';


export function main(){
    // Page is ready : showPageAction and check if current page is a profile
    sendMessageFrontend({body: 'showPageAction'});
    isProfile();

    // Add MutationObserver to track, when page changes (Instagram is an SPA)
    const observerHandler = mutations => {
        // Detect if current page has a profile
        isProfile(); 
    };

    const observer = new MutationObserver(observerHandler);
     
    // Listen for all changes to body and child nodes
    observer.observe(document.body, {attributes: true, childList: true, characterData: true});

    chrome.runtime.onMessage.addListener((request, sender) => {
        if(request.body === 'get_followers' || request.body === 'get_following'){
            let index = request.body === 'get_followers' ? 1 : 2;
            fetchProfileData(index);
        }else{
            // THIS DOESN'T CONCERN YOU
        }

    });
}