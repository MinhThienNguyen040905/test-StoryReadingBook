import LoginPage from '../../../pageobjects/auth/login.page.js';
import RegisterPage from '../../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_REG_007: Register with weak password (<8 chars or missing uppercase/digit/special)', () => {

    it('Should prevent registration when password is weak', async () => {
        console.log('--- START TC_REG_007: WEAK PASSWORD ---');

        await LoginPage.goToLoginFromIntro();

        await RegisterPage.goToRegisterPage();

        const invalidUser = TEST_USERS.WEAK_PASSWORD_USER;
        console.log(`-> Attempting registration with weak password: "${invalidUser.password}"`);

        await RegisterPage.register(invalidUser);

        console.log('-> Checking: should STAY on Register screen (NOT redirect to Login)');

        try {
            await expect(LoginPage.btnSubmit).not.toBeDisplayed({ timeout: 20000 });
            console.log('✅ Validation worked: stayed on Register screen');
        } catch (error) {
            throw new Error('❌ TEST FAILED: Registration succeeded with weak password! App redirected to Login screen.');
        }

        // Kiểm tra nút Submit của Register vẫn còn tồn tại
        await expect(RegisterPage.btnSubmit).toBeDisplayed({
            timeout: 8000,
            message: 'Submit button on Register screen disappeared → likely redirected despite weak password!'
        });

        console.log('✅ TC_REG_007 PASSED: Registration blocked due to weak password');
    });
});