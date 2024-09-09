const labelToggler = ()=>{
  const browserAPI = window.browser || window.chrome;
  browserAPI.storage.local.get(['enable-status'],(result)=>{
      if(result['enable-status'] === "enabled")document.querySelector('h3').innerHTML = "Disable Click to Remove Functionality"
      else document.querySelector('h3').innerHTML = "Click Enable to Remove Advertisement"
  })
}

labelToggler()

document.querySelector("#enable").addEventListener("click",(e)=>{
  e.preventDefault()
  const browserAPI = window.browser || window.chrome;
  browserAPI.storage.local.set({'enable-status':'enabled'},()=>{
          labelToggler()
          browserAPI.tabs.query({active: true, currentWindow: true}, (tabs) => {
          browserAPI.tabs.sendMessage(tabs[0].id, {action: "hideItem"});
      });
  })
})
document.querySelector("#disable").addEventListener("click",(e)=>{
  e.preventDefault()
  const browserAPI = window.browser || window.chrome;
  browserAPI.storage.local.set({'enable-status':'disabled'},()=>{
          labelToggler()
          browserAPI.tabs.query({active: true, currentWindow: true}, (tabs) => {
          browserAPI.tabs.sendMessage(tabs[0].id, {action: "stopHidingItem"});
      });
  })
})
