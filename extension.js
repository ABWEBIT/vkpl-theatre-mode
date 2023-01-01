'use strict';
let tab;

chrome.tabs.query(
  {active:true,currentWindow:true},
  function(tabs){tab = tabs[0];}
);

const key = 'mode';
let value = {name:'normal'};

chrome.storage.local.get(function(obj){
  if(typeof obj.key === 'undefined'){
    chrome.storage.local.set({key:value});
  };
});

function storageFunc(){
  chrome.storage.local.get(function(obj){
    console.log(obj.key.name);
    if(obj.key.name === 'normal') modeFuncTheatre();
    else if(obj.key.name === 'theatre') modeFuncNormal();
  });
};

function modeFuncTheatre(){
  value = {name:'theatre'};
  chrome.storage.local.set({key:value});
  chrome.scripting.insertCSS({
    target: {tabId: tab.id},
    files: ['mode.css']
  });
};

function modeFuncNormal(){
  value = {name:'normal'};
  chrome.storage.local.set({key:value});
  chrome.scripting.removeCSS({
    target: {tabId: tab.id},
    files: ['mode.css']
  });
}

document.querySelector('.button[data-type="modeFunc"]').addEventListener('click',storageFunc);
