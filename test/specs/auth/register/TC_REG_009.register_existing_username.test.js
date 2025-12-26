import LoginPage from '../../../pageobjects/auth/login.page.js';
import RegisterPage from '../../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_REG_009: Register with existing username', () => {

    it('Should prevent registration when username already exists', async () => {
        console.log('--- START TC_REG_009: EXISTING USERNAME ---');

        await LoginPage.goToLoginFromIntro();

        await RegisterPage.goToRegisterPage();

        const invalidUser = TEST_USERS.EXISTING_USERNAME_USER;
        console.log(`-> Attempting registration with existing username: "${invalidUser.username}" (email: ${invalidUser.email})`);

        await RegisterPage.register(invalidUser);

        // === KHẲNG ĐỊNH CHẮC CHẮN: KHÔNG ĐƯỢC REDIRECT ===
        console.log('-> Expecting NO redirection to Login screen (must stay on Register)');

        // Chờ tối đa 20s, nếu thấy btn_login_submit → nghĩa là redirect → BUG → FAIL ngay
        const isRedirected = await LoginPage.btnSubmit.isDisplayed().catch(() => false);
        if (isRedirected) {
            throw new Error('❌ TEST FAILED: Registration succeeded with existing username! App redirected to Login screen - THIS IS A BUG!');
        }

        // Thêm kiểm tra tích cực: phải còn thấy element của Register screen
        await RegisterPage.btnSubmit.waitForDisplayed({ timeout: 10000 });
        await expect(RegisterPage.btnSubmit).toBeDisplayed();

        console.log('✅ TC_REG_009 PASSED: Registration correctly blocked due to existing username');
    });
});