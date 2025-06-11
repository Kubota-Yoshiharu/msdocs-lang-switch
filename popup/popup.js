document.getElementById('apply').addEventListener('click', () => {
    const lang = document.getElementById('lang').value;
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'switchLang', lang });
    });
    chrome.storage.sync.set({ preferredLang: lang });
});
