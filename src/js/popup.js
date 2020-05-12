chrome.storage.local.get(['instaName', 'instaPosts', 'instaFollowers', 'instaFollowing'], (response) => {
    if(Object.keys(response).length !== 0){
        document.querySelector('p').style.display = 'none';
        document.querySelector('.profile').style.display = 'block';

        document.querySelector('.profile').innerHTML = `
            <p><b>Name:</b> ${response.instaName}</p>
            <p><b>Posts:</b> ${response.instaPosts}</p>
            <p><b>Followers:</b> ${response.instaFollowers}</p>
            <p><b>Following:</b> ${response.instaFollowing}</p>
        `;
    }
});