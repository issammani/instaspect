window.addEventListener('load', () => {
    (async () => {
        const src = chrome.extension.getURL('src/js/content.js');
        const contentScript = await import(src);
        contentScript.main();
    })();
})