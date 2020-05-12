const requestLogger = (request, sender) => {
    console.log('New Message:\nRequest:\n', request,'\nSender:\n', sender);
}

export default requestLogger;