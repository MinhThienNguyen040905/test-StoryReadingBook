// test/pageobjects/login.page.js
import Page from '../page.js';

class LoginPage extends Page {
    // Accessibility ID bạn đã đặt trong Compose (xem mã Kotlin của bạn)
    get btnIntroLogin() { return $('~btn_intro_login'); }
    get inputEmail() { return $('~input_email'); }
    get inputPassword() { return $('~input_password'); }
    get btnSubmit() { return $('~btn_login_submit'); }

    async goToLoginFromIntro() {
        await this.btnIntroLogin.waitForDisplayed({ timeout: 15000 });
        await this.btnIntroLogin.click();
    }

    async login(email, password) {
        await this.inputEmail.waitForDisplayed({ timeout: 10000 });
        await this.inputEmail.click();
        await this.pause(1);
        await browser.keys(email);
        await this.hideKeyboard();

        await this.inputPassword.click();
        await this.pause(1);
        await browser.keys(password);
        await this.hideKeyboard();

        await this.btnSubmit.click();
    }
}

export default new LoginPage();