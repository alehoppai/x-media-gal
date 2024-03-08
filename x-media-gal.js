function scrollUnless(retries = 100, cb) {
  let scrollHeight = document.body.scrollHeight;

  let interval = setInterval(() => {
    console.log("scroll attempts", retries);
    if (retries < 0) {
      console.log("scroll DONE");
      clearInterval(interval);
      interval = null;
      cb();
    }

    window.scrollTo(0, document.body.scrollHeight);
    const newScrollHeight = document.body.scrollHeight;

    if (newScrollHeight > scrollHeight) {
      scrollHeight = newScrollHeight;
    } else {
      retries -= 1;
    }
  }, 100);
}

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
