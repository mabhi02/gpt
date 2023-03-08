chrome.scripting.onMessage.addListener((message, sender, sendResponse) => {
  // Check if the message type is 'clipboard'
  if (message.type === 'clipboard') {
    // Get the current clipboard contents
    navigator.clipboard.readText().then((text) => {
      // Send a request to the ChatGPT API to generate a response
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
        },
        body: JSON.stringify({
          prompt: text,
          max_tokens: 100,
          n: 1,
          stop: '\n',
        }),
      })
      .then(response => response.json())
      .then((data) => {
        // Put the generated response back into the clipboard
        const response = data.choices[0].text.trim();
        navigator.clipboard.writeText(response);
      })
      .catch((error) => {
        console.error(error);
      });
    });
  }
});

// Listen for clipboard events
chrome.scripting.executeScript({
  target: {tabId: sender.tab.id},
  func: () => {
    document.addEventListener('copy', () => {
      chrome.runtime.sendMessage({type: 'clipboard'});
    });
  },
});
