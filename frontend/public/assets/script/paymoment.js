function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('is-active');
    });
    document.getElementById(tabId).classList.add('is-active');
}

function showEWalletTab(tabId) {
    const tabs = document.querySelectorAll('#boxEWallet .tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('is-active');
    });
    document.getElementById(tabId).classList.add('is-active');
}