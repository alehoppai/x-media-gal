export async function onFinished(message: any) {
  if (message.collect && message.collect === "finished") {
    console.log(message);
    const keys = await chrome.storage.local.get("keys");

    if (!keys || !keys.length) {
      chrome.storage.local.set({ keys });
    } else {
      keys.push(message.result.for);
      chrome.storage.local.set({ keys });
    }

    chrome.storage.local.set({
      key: message.result.for,
      imgs: message.result.imgs,
    });

    await chrome.runtime.sendMessage({ collect: "saved" });
  }
}
