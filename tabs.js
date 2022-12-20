const port = chrome.runtime.connect({ name: "tabs" });

port.onMessage.addListener((data) => {
  const tabs = document.querySelector("#tabs");
  tabs.innerHTML = data.tabs;
  for (let i = 0; i < tabs.children.length; i++) {
    if (tabs.children[i].dataset.id == data.tabId) {
      tabs.children[i].className += " active";
    }
    tabs.children[i].onclick = function (e) {
      port.postMessage({
        tab: parseInt(this.dataset.id),
        action: e.button == 1 ? "close" : "activate",
      });
    };
    tabs.onmousewheel = (e) => {
      const tabs = document.querySelector("#tabs");
      const active = document.querySelector(".active");
      const tabId = 0;
      if (e.wheelDelta > 0) {
        if (active.previousSibling != null) {
          tabId = active.previousSibling.dataset.id;
        } else {
          tabId = tabs.children[tabs.children.length - 1].dataset.id;
        }
      } else if (e.wheelDelta < 0) {
        if (active.nextSibling != null) {
          tabId = active.nextSibling.dataset.id;
        } else {
          tabId = tabs.children[0].dataset.id;
        }
      }

      port.postMessage({
        tab: tabId,
        action: "activate",
      });
      return false;
    };
  }
});
