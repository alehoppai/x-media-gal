export function scrollUnless(retries = 100, cb: () => void) {
  let scrollHeight = document.body.scrollHeight;

  let interval = setInterval(() => {
    console.log("scroll attempts", retries);
    if (retries < 0) {
      console.log("scroll DONE");
      clearInterval(interval);
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
