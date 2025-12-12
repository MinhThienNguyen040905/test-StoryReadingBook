import LoginPage from '../../pageobjects/auth/login.page.js';
import HomePage from '../../pageobjects/home.page.js';
import { TEST_USERS } from '../../data/users.js'; // Import data

describe('Kiểm thử chức năng Đăng Nhập', () => {
    it('TC01: Đăng nhập thành công với tài khoản hợp lệ', async () => {
        console.log('--- BẮT ĐẦU TEST CASE ---');

        // 1. Chờ app khởi động
        await browser.pause(5000);

        // 2. Click nút Login trên màn hình Intro
        await LoginPage.goToLoginFromIntro();

        // 3. Nhập thông tin (Lưu ý: Check lại email/pass xem đúng với DB chưa nhé)
        await LoginPage.login(TEST_USERS.ADMIN.email, TEST_USERS.ADMIN.password);

        // 4. Kiểm tra (Assertion chuẩn WDIO)
        console.log('-> Đang chờ màn hình Home...');

        // Gọi thẳng vào Element txtTitle bên HomePage
        await expect(HomePage.txtTitle).toBeDisplayed({
            wait: 20000,
            message: 'Không tìm thấy chữ Home sau khi đăng nhập!'
        });

        console.log('✅ TEST PASSED: Đã vào được màn hình Home');
    });
});