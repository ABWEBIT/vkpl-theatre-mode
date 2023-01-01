'use strict';
let css,tab;

chrome.tabs.query(
  {active:true,currentWindow:true},
  function(tabs){tab = tabs[0];}
);

const key = 'mode';
let value = {name:'normal'};

chrome.storage.local.set({key:value},()=>{
  modeFuncNormal();
});


function storageFunc(){
  chrome.storage.local.get([key],()=>{
    if(value.name === 'normal') modeFuncTheatre();
    else if(value.name === 'theatre') modeFuncNormal();
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