const languages = ['en-us', 'ja-jp'];
function insertSwitcher(prefLang) {
    if (document.getElementById('lang-switcher')) return;
    const bar = document.createElement('div');
    bar.id = 'lang-switcher';
    bar.style = 'position:fixed;top:0;right:0;z-index:9999;background:#fff;padding:5px;';
    const select = document.createElement('select');
    languages.forEach(l => {
        const opt = new Option(l, l);
        if (l === prefLang) opt.selected = true;
        select.add(opt);
    });
    select.onchange = () => switchLang(select.value);
    bar.appendChild(select);
    document.body.prepend(bar);
}

function switchLang(lang) {
    const url = new URL(location.href);
    url.pathname = url.pathname.replace(/^\/[a-z]{2}-[a-z]{2}\//, `/${lang}/`);
    location.href = url.toString();
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'switchLang') switchLang(msg.lang);
});

chrome.storage.sync.get('preferredLang', data => {
    insertSwitcher(data.preferredLang || 'en-us');
});
