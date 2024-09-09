const hideClickedItems = (e)=>{
  e.preventDefault();
  if(e.target !== document.body) e.target.style.display = 'none'
}

const handleHideClick = (browserAPI)=>{
  browserAPI.storage.local.get(['enable-status'],(result)=>{
      if(result['enable-status'] === "enabled"){
        // document.body.removeEventListener("click",hideClickedItems)
        document.body.addEventListener("click",hideClickedItems)
      }
      else document.body.removeEventListener("click",hideClickedItems)
  })
}

const browserAPI = window.browser || window.chrome;

browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "hideItem") {
    document.body.addEventListener("click",hideClickedItems)
  }
  else if(message.action === "stopHidingItem"){
      document.body.removeEventListener("click",hideClickedItems)
  }
});

const hideAdItems = ()=>{
  const all_ad_elems = document.querySelectorAll('iframe[src*="ad"],iframe[id*="ad"],iframe[class*="add"],iframe[srcdoc*="ad"],div[id*="ad"],div[class*="ad"],div[class*="sponsored"],div[id*="sponsored"]')
  all_ad_elems.forEach(item=>{
      item.style.display = 'none'
  })
}

hideAdItems()
handleHideClick(browserAPI)

document.addEventListener('visibilitychange',()=>handleHideClick(browserAPI))

const observer =new MutationObserver(hideAdItems)
observer.observe(document.body,{childList:true,attributes:true,subtree:true,characterData:true})
