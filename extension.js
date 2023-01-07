'use strict';
let tab,value;

chrome.tabs.query(
  {active:true,currentWindow:true},
  function(tabs){tab = tabs[0];}
);

function storageFunc(){
  chrome.storage.local.get(function(obj){
    if(typeof obj.mode === 'undefined'){
      value = {name:'normal'};
      chrome.storage.local.set({'mode':value});
    }
    else if(obj.mode.name === 'normal') modeFuncTheatre()
    else if(obj.mode.name === 'theatre') modeFuncNormal();
  });
};

function modeFuncTheatre(){
  value = {name:'theatre'};
  chrome.storage.local.set({'mode':value});
  chrome.scripting.insertCSS({
    target: {tabId: tab.id},
    files: ['mode.css']
  });
};

function modeFuncNormal(){
  value = {name:'normal'};
  chrome.storage.local.set({'mode':value});
  chrome.scripting.removeCSS({
    target: {tabId: tab.id},
    files: ['mode.css']
  });
}

document.querySelector('.button[data-type="modeFunc"]').addEventListener('click',storageFunc);
