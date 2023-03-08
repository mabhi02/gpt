function generateResponse(text) {
    const apiKey = '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';
    const apiUrl = `https://api.openai.com/v1/engine/davinci-codex/completions?prompt=${text}&max_tokens=100`;
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const completion = data.choices[0].text.trim();
      navigator.clipboard.writeText(completion);
    })
    .catch(error => console.error(error));
  }
  
  navigator.clipboard.readText()
    .then(text => generateResponse(text))
    .catch(error => console.error(error));
  