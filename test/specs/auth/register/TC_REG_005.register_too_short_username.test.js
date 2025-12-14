import LoginPage from '../../../pageobjects/auth/login.page.js';
import RegisterPage from '../../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_REG_005: Register with username too short (< 3 characters)', () => {

    it('Should prevent registration when username is too short', async () => {
        console.log('--- START TC_REG_005: TOO SHORT USERNAME ---');

        await LoginPage.goToLoginFromIntro();

        await RegisterPage.goToRegisterPage();

        const invalidUser = TEST_USERS.SHORT_USERNAME_USER;
        console.log(`-> Attempting registration with too short username: "${invalidUser.username}" (length: ${invalidUser.username.length})`);

        await RegisterPage.register(invalidUser);

        console.log('-> Checking: should STAY on Register screen (NOT redirect to Login)');

        try {
            await expect(LoginPage.btnSubmit).not.toBeDisplayed({ timeout: 20000 });
            console.log('✅ Validation worked: stayed on Register screen');
        } catch (error) {
            throw new Error('❌ TEST FAILED: Registration succeeded with username too short! App redirected to Login screen.');
        }

        // Kiểm tra nút Submit của Register vẫn còn tồn tại
        await expect(RegisterPage.btnSubmit).toBeDisplayed({
            timeout: 8000,
            message: 'Submit button on Register screen disappeared → likely redirected despite short username!'
        });

        console.log('✅ TC_REG_005 PASSED: Registration blocked due to username too short');
    });
});