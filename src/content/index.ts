import { scrollUnless } from "./scrollUnless";

(() => {
  console.log("i'm running! X-Media-Gal");

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(
      "Message received in content script",
      message,
      sender,
      sendResponse
    );

    if (message.collect === "start") {
      scrollUnless(100, async () => {
        const imgs = Array.from(document.querySelectorAll("img"))
          .map((img) => img.src)
          .filter((src) => src.includes("pbs.twimg.com/media"))
          .map((src) => ({
            small: src,
            large: src.replaceAll("small", "large"),
          }));

        const result = { for: message.for, imgs };
        await chrome.runtime.sendMessage({ collect: "finished", result });
      });
    }
  });
})();
