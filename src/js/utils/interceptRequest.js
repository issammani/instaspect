/*** Source : https://lowrey.me/intercept-2/ */
const URL_MATCH = 'fetch_mutual';
const intercept = (url_match, callback) => {
    let send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        this.addEventListener('readystatechange', function() {
        if (this.responseURL.includes(url_match) && this.readyState === 4) {
            //callback(this);
            callback(this.response || "");
        }
        }, false);
        send.apply(this, arguments);
    };
}

intercept(URL_MATCH, (response) => {
    console.log('Saving to file...', response.length);
    chrome.runtime.sendMessage('nfnghmhejhmjhhngjliebjjnclbaojlg',{body: 'parse_json', data: response});
});
