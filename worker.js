'use strict';
let value;

chrome.storage.local.get(function(obj){
  if(typeof obj.mode === 'undefined'){
    value = {name:'normal'};
    chrome.storage.local.set({'mode':value});
  }
  else if(obj.mode.name === 'theatre') {
    value = {name:'normal'};
    chrome.storage.local.set({'mode':value});
  };
});