let tabTitle = "";
let keys = [];
let gals = [];

document.getElementById("collect").addEventListener("click", () => {
  console.log("Start", chrome.tabs);
  chrome.runtime.sendMessage({ collect: "start", for: tabTitle.slice(1) });
  document.body.innerHTML += "<h2>Collecting</h2>";
});

/** @param {string} title */
function parseMediaTabTitle(title) {
  const start = title.indexOf("(");
  const end = title.indexOf(")");

  if (start < 0 || end < 0) {
    throw new Error("Invalid tab title");
  }

  return title.slice(start + 1, end);
}

const presistData = async () => {
  const keysJSON = await chrome.storage.local.get("keys");
  const keys = JSON.parse(keysJSON) ?? [];

  if (!keys || keys.length) {
    return;
  }

  const dataRequests = keys.map((key) => chrome.storage.local.get(key));
  const galsJSON = Promise.all(dataRequests);
};

(async () => {
  const q = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(q);
  tabTitle = parseMediaTabTitle(tab.title);
  document.getElementById("gal-header_title").innerText = tabTitle;

  console.log(tab, tabTitle);
})();
