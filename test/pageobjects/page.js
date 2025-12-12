// test/pageobjects/page.js
export default class Page {
    async open(path = '') {
        // Không cần làm gì đặc biệt với app native
        return browser;
    }

    async hideKeyboard() {
        try {
            if (await browser.isKeyboardShown()) {
                await browser.hideKeyboard();
            }
        } catch (e) {
            // Một số thiết bị không hỗ trợ isKeyboardShown → bỏ qua
        }
    }

    async pause(seconds = 1) {
        await browser.pause(seconds * 1000);
    }
}