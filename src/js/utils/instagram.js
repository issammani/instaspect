import selectors from './selectors.js';
import {sendMessageFrontend} from './requestSender.js';

// Check if current page is a profile
const isProfile = () => {
    const profileData = document.querySelectorAll(selectors.PROFILE_COUNT_SELECTOR);
    const profileName = selectors.PROFILE_NAME_SELECTORS.map(selector => document.querySelector(selector)).filter(v => v);

    // Check wether the current page is a profile page
    if(profileName.length >= 1 && profileData.length === 3){
        sendMessageFrontend({body: 'profilePage', profile: {
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


const fetchProfileData = (index) => {
    // Trigger click event
    const clickableTarget = document.querySelectorAll(selectors.PROFILE_COUNT_SELECTOR)[index].querySelector('a');
    clickableTarget.click();
};

export {isProfile, fetchProfileData};