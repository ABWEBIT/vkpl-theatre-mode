'use strict';
chrome.storage.session.get(['mode']).then((obj)=>{
  if(obj.mode === undefined){
    chrome.storage.session.set({'mode':{name:'normal'}});
  }
});