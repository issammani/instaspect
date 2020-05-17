/*** Source : https://lowrey.me/intercept-2/ */
const URL_MATCH = 'fetch_mutual';
const intercept = (url_match, callback) => {
    let send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        this.addEventListener('readystatechange', function() {
            if (this.responseURL.includes(url_match) && this.readyState === 4 && this.status === 200) {
                callback(this.response || JSON.stringify({}));
            }else if(this.responseURL.includes(url_match) && this.readyState === 4 && this.status === 429){
                // Instagram limits the number of requests to 200 per hour
                callback({error: 'request_limit_reached'});
            }else{
                // callback(JSON.stringify({})); // DO NOTHING !
            }
        }, false);
        send.apply(this, arguments);
    };
}

intercept(URL_MATCH, (response) => {
    chrome.runtime.sendMessage('nfnghmhejhmjhhngjliebjjnclbaojlg',{body: 'parse_json', data: response});
});
