var url = 'https://www.google.com/searchbyimage?image_url=';

chrome.contextMenus.onClicked.addListener(function (info, tab) {

	fetch(info.srcUrl, {
		mode: 'cors',
	})
		.then(res => res.blob()) // Gets the response and returns it as a blob
		.then(blob => {
			const data = new FormData();
			data.append('encoded_image', blob);

			fetch('https://www.google.com/searchbyimage/upload', {
				referrer: '',
				mode: 'cors',
				method: 'POST',
				body: data
			}).then(res => {
				chrome.tabs.create({
					url: res.url,
					index: tab.index + 1
				})
			});
		});
});

var onInitialize = function () {
	chrome.contextMenus.create({
		title: 'Search Google using this image',
		contexts: ['image'],
		targetUrlPatterns: ['https://*/*', 'http://*/*'],
		id: 'contextMenu'
	});
};

chrome.runtime.onStartup.addListener(onInitialize);
chrome.runtime.onInstalled.addListener(onInitialize);
