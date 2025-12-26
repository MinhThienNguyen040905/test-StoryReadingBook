import LoginPage from '../../../pageobjects/auth/login.page.js';
import RegisterPage from '../../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_REG_002: Register with empty username', () => {

    it('Should prevent registration and stay on Register screen', async () => {
        console.log('--- START TC_REG_002: EMPTY USERNAME VALIDATION ---');

        // App đã reset → đang ở Intro
        await LoginPage.goToLoginFromIntro();

        await RegisterPage.goToRegisterPage();

        const invalidUser = TEST_USERS.EMPTY_USERNAME_USER;
        console.log(`-> Attempting registration with empty username: ${invalidUser.email}`);
        await RegisterPage.register(invalidUser);

        console.log('-> Should NOT redirect to Login screen');
        await expect(LoginPage.btnSubmit).not.toBeDisplayed({
            timeout: 10000,
            timeoutMsg: 'Validation failed: redirected to Login despite empty username!'
        });

        // Nếu frontend hiển thị error message (bạn thêm contentDescription sau)
        // await expect(RegisterPage.errorUsername).toBeDisplayed();

        console.log('✅ TC_REG_002 PASSED: Registration blocked due to empty username');
    });
});