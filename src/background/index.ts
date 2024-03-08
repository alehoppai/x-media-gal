import { onStart } from "./onStart";
import { onFinished } from "./onFinished";

chrome.runtime.onMessage.addListener(async (message) => {
  // FYI|FIXME: super ugly just to test webpack build of empty files
  await onStart(message);
  await onFinished(message);
});
