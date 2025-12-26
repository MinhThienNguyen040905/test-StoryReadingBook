import LoginPage from '../../../pageobjects/auth/login.page.js';
import RegisterPage from '../../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_REG_008: Register with mismatched confirm password', () => {

    it('Should prevent registration when password and confirm password do not match', async () => {
        console.log('--- START TC_REG_008: MISMATCHED PASSWORD ---');

        await LoginPage.goToLoginFromIntro();

        await RegisterPage.goToRegisterPage();

        const invalidUser = TEST_USERS.MISMATCHED_PASSWORD_USER;
        console.log(`-> Attempting registration with mismatched passwords:`);
        console.log(`   Password: "${invalidUser.password}"`);
        console.log(`   Confirm : "${invalidUser.confirmPassword}"`);

        await RegisterPage.register(invalidUser);

        console.log('-> Checking: should STAY on Register screen (NOT redirect to Login)');

        try {
            await expect(LoginPage.btnSubmit).not.toBeDisplayed({ timeout: 20000 });
            console.log('✅ Validation worked: stayed on Register screen');
        } catch (error) {
            throw new Error('❌ TEST FAILED: Registration succeeded despite mismatched passwords! App redirected to Login screen.');
        }

        // Kiểm tra nút Submit của Register vẫn còn tồn tại
        await expect(RegisterPage.btnSubmit).toBeDisplayed({
            timeout: 8000,
            message: 'Submit button on Register screen disappeared → likely redirected despite mismatched passwords!'
        });

        console.log('✅ TC_REG_008 PASSED: Registration blocked due to mismatched passwords');
    });
});