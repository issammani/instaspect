import selectors from './selectors.js';

const scroll = (element) => {
    element.scrollBy(0 , 1000);
};

window.addEventListener('message', function(event) {
    const intervalId = setInterval(() => {
        if(document.querySelector(selectors.CURRENTLY_SHOWN_MODAL).parentNode){
            document.querySelector(selectors.CURRENTLY_SHOWN_MODAL).parentNode.scrollBy(0, 2000);
            clearInterval(intervalId);
        }else{
            console.log('Nope');
        }
    }, 100);
    
});