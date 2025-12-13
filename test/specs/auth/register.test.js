import LoginPage from '../../pageobjects/auth/login.page.js';
import RegisterPage from '../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../data/users.js';

describe('Kiểm thử chức năng Đăng Ký', () => {

    it('TC_REG_001: Đăng ký thành công với dữ liệu hợp lệ (Happy Path)', async () => {
        console.log('--- BẮT ĐẦU TEST ĐĂNG KÝ ---');

        // 1. Vào màn hình Login
        await browser.pause(5000);
        await LoginPage.goToLoginFromIntro();

        // 2. Chuyển sang màn hình Register
        console.log('-> Chuyển sang trang Đăng ký');
        await RegisterPage.goToRegisterPage();

        // 3. Thực hiện đăng ký
        const user = TEST_USERS.NEW_USER;
        console.log(`-> Đang đăng ký với user: ${user.email}`);
        await RegisterPage.register(user);

        // 4. Kiểm tra kết quả
        // Mong đợi: Quay lại màn hình Login sau khi đăng ký thành công
        // Ta sẽ kiểm tra xem nút "Log in" có hiện ra không
        console.log('-> Đang chờ chuyển hướng về Login...');

        await expect(LoginPage.btnSubmit).toBeDisplayed({
            wait: 20000,
            message: 'Đăng ký thất bại hoặc không tự động quay về trang Login!'
        });

        console.log('✅ TEST PASSED: Đăng ký thành công!');
    });

});