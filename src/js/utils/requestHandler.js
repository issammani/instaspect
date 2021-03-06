/**
 * After a bit of research and testing, the following separators 
 * are used differently depending on the language:
 *       |  English                 |  French                 |  German                 |
 * ----- +--------------------------+-------------------------+-------------------------+
 * dot   |  decimal separator       |  Not used               |  digit group separator  |
 * ------+--------------------------+-------------------------+-------------------------+
 * comma |  digit group separator   |  decimal separator      |  decimal separator      |
 * ------+--------------------------+-------------------------+-------------------------+
 * space |  Not used                |  digit group separator  |  Not used               |
 * ------+--------------------------+-------------------------+-------------------------+
 * Decimal group separator: 3.5m = 350000
 * Digit group separator: 1 100 = 1100
 */
const parseCount = (rawCountString) => {
    const stripNumberRegex = /(\d+[,\.\ ]?(:?\d*)?)([kmb])?/i;
    // Look for a matching count number
    let countString = rawCountString.match(stripNumberRegex);
    if(countString.length === 4){
        // count has a letter suffix (k, m or b) [Probably an overkill allowing billions]
        let multiplier = {'k': 10**3, 'm': 10**6, 'b': 10**9};
        return (
            countString[3]
                ? Math.ceil(Number(countString[1].replace(',','.')) * multiplier[countString[3]])
                : Math.ceil(Number(countString[1].replace(/[\s\.,]/,'')))
        );
    }else{
        // NO MATCH
        console.error('Error parsing count strings');
    }
}

const profilePageHandler = (profile) => {

    const profileData = {
        instaPosts: parseCount(profile.posts), 
        instaFollowers: parseCount(profile.followers),
        instaFollowing: parseCount(profile.following),
        instaName: profile.name
    };
    
    chrome.storage.local.set(profileData);
};


const requestHandler = (request, sender, sendRequest, instagramTabId) => {
    if(request.body === 'showPageAction'){
        chrome.pageAction.show(sender.tab.id);
    }else if(request.body === 'profilePage'){
        profilePageHandler(request.profile);
    }      
};

export default requestHandler;