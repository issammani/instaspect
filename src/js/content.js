const PROFILE_DATA_SELECTOR = 'header section ul li';
const PROFILE_NAME_SELECTOR = 'header section h2';

window.addEventListener('load', () => {

    // Check if current page is a profile
    const isProfile = () => {
        const profileData = document.querySelectorAll(PROFILE_DATA_SELECTOR);
        const profileName = document.querySelector(PROFILE_NAME_SELECTOR);

        // Check wether the current page is a profile page
        if(profileData.length === 3){
            chrome.runtime.sendMessage({body: 'profilePage', profile: {
                name: profileName.textContent,
                posts: profileData[0].textContent,
                followers: profileData[1].textContent,
                following: profileData[2].textContent
            }});
        }
    };

    // Page is ready : showPageAction and check if current page is a profile
    chrome.runtime.sendMessage({body: 'showPageAction'});
    isProfile();

    // Add MutationObserver to track, when page changes (Instagram is an SPA)
    const observerHandler = mutations => isProfile(); 

    const observer = new MutationObserver(observerHandler);
     
    // Listen to all changes to body and child nodes
    observer.observe(document.body, {attributes: true, childList: true, characterData: true});

});