// test/pageobjects/home.page.js
class HomePage {
    // Có thể dùng text hoặc content-desc, mình dùng cả hai để chắc chắn
    get txtTitle() {
        return $('//android.widget.TextView[@text="Home"]');
    }

    async isDisplayed() {
        await this.txtTitle.waitForDisplayed({ timeout: 20000 });
        return await this.txtTitle.isDisplayed();
    }
}

export default new HomePage();