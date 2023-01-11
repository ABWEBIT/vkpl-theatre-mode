'use strict';
chrome.storage.session.get(['mode']).then((obj)=>{
  if(obj.mode === undefined){
    chrome.storage.session.set({'mode':{name:'normal'}});
  }
});

let tab,link;

chrome.action.onClicked.addListener((tab)=>{

  chrome.tabs.query(
    {active:true,currentWindow:true},
    function(tabs){
      tab = tabs[0];
      link = tab.url;
      modeFunc();
    }
  );

  chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    if(changeInfo.status === 'complete'){
      if(tab.url === link){
        modeNormal();
      };
    };
  });

  function modeFunc(){
    chrome.storage.session.get(['mode']).then((obj)=>{
      if(obj.mode.name === 'normal') modeTheatre()
      else if(obj.mode.name === 'theatre') modeNormal();
    });
  };

  function modeTheatre(){
    chrome.action.setIcon({ path:'vkpl-on.png'});
    chrome.storage.session.set({'mode':{name:'theatre'}}).then(()=>{
      chrome.scripting.insertCSS({
        target: {tabId: tab.id},
        files: ['mode.css']
      });
    });
  };

  function modeNormal(){
    chrome.action.setIcon({ path:'vkpl-off.png'});
    chrome.storage.session.set({'mode':{name:'normal'}}).then(()=>{
      chrome.scripting.removeCSS({
        target: {tabId: tab.id},
        files: ['mode.css']
      });
    });
  };

});
