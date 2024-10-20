document.getElementById('send-value').addEventListener('click', () => {
    const value = document.getElementById('value-input').value;
  
    // Send the value to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: exposeValueToPage,
        args: [value],
      });
    });
  });
  
  // This function will be injected into the page
  function exposeValueToPage(value) {
    // Create a global variable on the website
    window.exposedValue = value;
    console.log('Exposed Value:', value);
  }