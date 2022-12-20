const tabs = document.createElement("iframe");
tabs.setAttribute("src", chrome.extension.getURL("tabs.html"));
tabs.style.position = "fixed";
tabs.style.height = "40px";
tabs.style.top = "0";
tabs.style.left = "0";
tabs.style.width = "100vw";
tabs.style.zIndex = "9999999";
tabs.style.border = "none";

document.documentElement.appendChild(tabs);
