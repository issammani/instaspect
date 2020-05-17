/*** Source: 
 * https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script/9517879#9517879 
 **/
const inject = (scriptUrl) => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(scriptUrl);
    script.type = 'module';
    script.onload = function() {
        this.remove();
    };

    (document.head || document.documentElement).appendChild(script);
}

export default inject;