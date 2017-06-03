console.log("plop")


chrome.runtime.onMessage.addListener(  function (request, sender: any, sendResponse) {

    console.log(sender)
    console.log(request)
    switch(request.action){
        case 'player_play':
        console.log('firePlayer')
        eventFire(document.getElementsByClassName('cover')[0], 'click');
         sendResponse(
        {
            result : 'done '
        }
    )
        break

    }
   
})

function eventFire(el : any, etype: any){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}