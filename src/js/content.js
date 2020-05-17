import selectors from './utils/selectors.js';
import inject from './utils/inject.js';
import {isProfile, fetchProfileData} from './utils/instagram.js';
import {sendMessageFrontend} from './utils/requestSender.js';
import {TextFile} from './utils/TextFile.js';

// Inject xhr interceptor
inject('src/js/utils/interceptRequest.js');

// Inject scroll function
inject('src/js/utils/scroll.js');




export function main(){
    // Initialize a new file
    const profilesFile = new TextFile('instaspect.txt');

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
        }else if(request.body === 'parsed_json'){
            // Append data to file
            profilesFile.append(request.data.toString());
            console.log('Posting message...');
            window.postMessage('scroll'); // Unclear docs about the separation between the running env of a content script and the actual webpage.
            
            // // Download file
            // profilesFile.download();

        }else{
            // THIS DOESN'T CONCERN YOU
        }

    });
}