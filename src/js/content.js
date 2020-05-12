const PROFILE_DATA_SELECTOR = 'header section ul li';
const PROFILE_NAME_SELECTORS = ['header section h1', 'header section h2'];

window.addEventListener('load', () => {
    
    // Check if current page is a profile
    const isProfile = () => {
        const profileData = document.querySelectorAll(PROFILE_DATA_SELECTOR);
        const profileName = PROFILE_NAME_SELECTORS.map(selector => document.querySelector(selector)).filter(v => v);

        // Check wether the current page is a profile page
        if(profileName.length >= 1 && profileData.length === 3){
            chrome.runtime.sendMessage({body: 'profilePage', profile: {
                name: profileName[0].textContent,
                posts: profileData[0].textContent,
                followers: profileData[1].textContent,
                following: profileData[2].textContent
            }});
        }else{
            // Delete previously cached data
            chrome.storage.local.remove(['instaName', 'instaPosts', 'instaFollowers', 'instaFollowing']);
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