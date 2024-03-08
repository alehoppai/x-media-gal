chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.collect && message.collect === "start") {
    const q = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(q);
    await chrome.tabs.sendMessage(tab.id, message);
  }

  if (message.collect && message.collect === "finished") {
    console.log(message);
    const keysJSON = await chrome.storage.local.get("keys");
    const keys = JSON.parse(keysJSON);

    if (!keys || !keys.length) {
      await chrome.storage.local.set(
        "keys",
        JSON.stringify([message.result.for])
      );
    } else {
      keys.push(message.result.for);
      await chrome.storage.local.set("keys", JSON.stringify(keys));
    }

    await chrome.storage.local.set(
      message.result.for,
      JSON.stringify(message.result.imgs)
    );

    await chrome.runtime.sendMessage({ collect: "saved" });
  }
});
