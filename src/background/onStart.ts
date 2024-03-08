export async function onStart(message: any) {
  if (message.collect && message.collect === "start") {
    const q = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(q);

    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, message);
    }
  }
}
