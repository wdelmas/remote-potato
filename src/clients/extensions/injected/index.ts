console.log("plop")


chrome.runtime.onMessage.addListener(  function (request, sender, sendResponse) {

    console.log(request)

    sendResponse(
        {
            result : 'test '
        }
    )
})