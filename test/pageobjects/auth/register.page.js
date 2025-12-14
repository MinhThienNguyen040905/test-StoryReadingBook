import Page from '../page.js';

class RegisterPage extends Page {
    // 1. Định nghĩa Elements
    get linkGoToRegister() { return $('~link_go_to_register'); }
    get inputEmail() { return $('~input_reg_email'); }
    get inputUsername() { return $('~input_reg_username'); }
    get btnSelectDob() { return $('~btn_select_dob'); }
    get inputPassword() { return $('~input_reg_password'); }
    get inputConfirmPassword() { return $('~input_reg_confirm_password'); }
    get btnSubmit() { return $('~btn_reg_submit'); }
    get errorUsername() { return $('~error_reg_username'); }  // Thêm mới: Giả sử frontend có contentDescription cho error message (e.g., "Username is required")

    // Elements của Date Picker (Native Android)
    get btnDialogOk() { return $('id=android:id/button1'); } // Sửa thành ID chuẩn
    get btnDialogCancel() { return $('id=android:id/button2'); }
    get btnSwitchToTextInput() { return $('~Switch to text input mode'); }
    get inputDateDialog() { return $('//android.widget.EditText'); }

    // 2. Actions
    async goToRegisterPage() {
        await this.linkGoToRegister.waitForDisplayed({ timeout: 15000 });
        await this.linkGoToRegister.click();
    }

    async selectDateOfBirth() {
        console.log("-> Đang mở Date Picker...");
        // 1. Click mở dialog
        await this.btnSelectDob.click();

        // 2. Chờ dialog animation (Wait cứng 2s vì ta không có element cụ thể để wait)
        await this.pause(2);

        // 3. CHIẾN THUẬT: Tìm tất cả các nút (Button) đang hiện trên màn hình
        // Compose thường render nút bấm là android.widget.Button
        const buttons = await $$('//android.widget.Button');

        if (buttons.length > 0) {
            console.log(`-> Tìm thấy ${buttons.length} nút bấm trong Dialog.`);

            // Lấy nút cuối cùng trong danh sách (Thường là OK / Confirm / Save)
            const okButton = buttons[buttons.length - 1];

            console.log("-> Đang click vào nút cuối cùng (OK)...");
            await okButton.click();
        } else {
            // Trường hợp hy hữu: Nếu Compose không dùng widget.Button mà dùng TextView
            // Ta thử tìm Text nào có chữ "OK" hoặc "Confirm" hoặc "Select"
            console.log("❌ Không thấy widget.Button, thử tìm theo Text...");
            const textButton = await $('//*[@text="OK" or @text="Confirm" or @text="Select"]');
            if (await textButton.isDisplayed()) {
                await textButton.click();
            } else {
                throw new Error("🚨 BỎ TAY: Không tìm thấy nút OK nào trong Date Picker!");
            }
        }
    }

    async register(user) {
        // Nhập Email
        await this.inputEmail.waitForDisplayed();
        await this.inputEmail.click();
        await this.pause(0.5);
        await browser.keys(user.email);
        await this.hideKeyboard();

        // Nhập Username (có thể rỗng cho test case invalid)
        await this.inputUsername.click();
        await this.pause(0.5);
        await browser.keys(user.username);
        await this.hideKeyboard();

        // Chọn ngày sinh
        await this.selectDateOfBirth();

        // Nhập Password
        await this.inputPassword.click();
        await this.pause(0.5);
        await browser.keys(user.password);
        await this.hideKeyboard();

        // Nhập Confirm Password
        await this.inputConfirmPassword.click();
        await this.pause(0.5);
        await browser.keys(user.confirmPassword);
        await this.hideKeyboard();

        // Submit
        await this.btnSubmit.click();
    }

    async isErrorDisplayed() {  // Thêm mới: Check nếu error message hiển thị
        await this.errorUsername.waitForDisplayed({ timeout: 5000 });
        return await this.errorUsername.isDisplayed();
    }
}

export default new RegisterPage();