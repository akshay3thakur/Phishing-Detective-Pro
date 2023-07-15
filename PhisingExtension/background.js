console.log(chrome.runtime);

chrome.runtime.onInstalled.addListener(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.prediction === 1) {
      alert("Warning: Phishing detected!!");
    } else if (message.prediction === -1) {
      alert("No phishing detected");
    }
  });
});
