import LoginPage from '../../../pageobjects/auth/login.page.js';
import RegisterPage from '../../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_REG_003: Register with invalid username characters', () => {

    it('Should prevent registration when username contains special characters', async () => {
        console.log('--- START TC_REG_003: INVALID USERNAME CHARACTERS ---');

        await LoginPage.goToLoginFromIntro();

        await RegisterPage.goToRegisterPage();

        const invalidUser = TEST_USERS.INVALID_CHARS_USERNAME_USER;
        console.log(`-> Attempting registration with invalid username: "${invalidUser.username}" (email: ${invalidUser.email})`);

        await RegisterPage.register(invalidUser);

        // === SỬA CHÍNH TẠI ĐÂY ===
        console.log('-> Checking: should STAY on Register screen (NOT redirect to Login)');

        // Cách 1: Chờ một khoảng thời gian hợp lý (20s) và kiểm tra xem có redirect không
        // Nếu trong 20s mà thấy btn_login_submit → nghĩa là redirect → test FAIL (đúng mong muốn)
        try {
            await expect(LoginPage.btnSubmit).not.toBeDisplayed({ timeout: 20000 });
            console.log('✅ Validation worked: stayed on Register screen');
        } catch (error) {
            // Nếu bắt được lỗi → nghĩa là btn_login_submit HIỂN THỊ → redirect xảy ra → validation KHÔNG hoạt động
            throw new Error('❌ TEST FAILED: Registration succeeded with invalid username characters! App redirected to Login screen.');
        }

        // Cách 2 (tốt hơn - khuyến nghị): Kiểm tra vẫn đang ở Register screen bằng một element đặc trưng
        // Ví dụ: nút Submit của Register vẫn còn hiển thị
        await expect(RegisterPage.btnSubmit).toBeDisplayed({
            timeout: 5000,
            message: 'Submit button on Register screen disappeared → likely redirected!'
        });

        console.log('✅ TC_REG_003 PASSED: Registration blocked due to invalid username characters');
    });
});