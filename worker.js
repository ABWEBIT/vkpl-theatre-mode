'use strict';
chrome.storage.session.get(['mode']).then((obj)=>{
  if(obj.mode === undefined){
    chrome.storage.session.set({'mode':{name:'normal'}});
  }
});

let tab;
const vk = 'vkplay.live';

chrome.action.onClicked.addListener(function(tab){

  let url = (new URL(tab.url)).hostname;
  if(url !== vk) return;

  chrome.tabs.query({active:true,currentWindow:true},
    function(tabs){
      tab = tabs[0];
      modeFunc();
    }
  );

  chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tabState){
    if(tab.id === tabId){
      modeNormal();
    };
  });

  chrome.tabs.onRemoved.addListener(function(tabId,removeInfo){
    if(tab.id === tabId){
      chrome.action.setIcon({path:'vkpl-off.png'});
      chrome.storage.session.set({'mode':{name:'normal'}});
    };
  });

  function modeFunc(){
    chrome.storage.session.get(['mode']).then((obj)=>{
      if(obj.mode === undefined) return
      else if(obj.mode.name === 'normal') modeTheatre()
      else if(obj.mode.name === 'theatre') modeNormal();
    });
  };

  function modeTheatre(){
    chrome.action.setIcon({path:'vkpl-on.png'});
    chrome.storage.session.set({'mode':{name:'theatre'}}).then(()=>{
      chrome.scripting.insertCSS({
        target: {tabId: tab.id},
        files: ['mode.css']
      });
    });
  };

  function modeNormal(){
    chrome.action.setIcon({path:'vkpl-off.png'});
    chrome.storage.session.set({'mode':{name:'normal'}}).then(()=>{
      chrome.scripting.removeCSS({
        target: {tabId: tab.id},
        files: ['mode.css']
      });
    });
  };

});
