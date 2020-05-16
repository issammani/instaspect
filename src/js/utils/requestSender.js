const sendMessageBackend = (request) => {
    chrome.tabs.query({active: true}, (tabs) => {
        console.log('sending request');
        chrome.tabs.sendMessage(tabs[0].id,request);
    });
};

const sendMessageFrontend = (request) => {
    chrome.runtime.sendMessage(request);
};

export {sendMessageBackend, sendMessageFrontend};