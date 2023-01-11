'use strict';
chrome.storage.local.get(['mode']).then((obj)=>{
  if(obj.mode === undefined){
    chrome.storage.local.set({'mode':{name:'normal'}});
  }
});