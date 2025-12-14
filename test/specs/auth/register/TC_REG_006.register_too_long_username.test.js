import LoginPage from '../../../pageobjects/auth/login.page.js';
import RegisterPage from '../../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_REG_006: Register with username too long (> 50 characters)', () => {

    it('Should prevent registration when username is too long', async () => {
        console.log('--- START TC_REG_006: TOO LONG USERNAME ---');

        await LoginPage.goToLoginFromIntro();

        await RegisterPage.goToRegisterPage();

        const invalidUser = TEST_USERS.LONG_USERNAME_USER;
        console.log(`-> Attempting registration with too long username: "${invalidUser.username}" (length: ${invalidUser.username.length})`);

        await RegisterPage.register(invalidUser);

        console.log('-> Checking: should STAY on Register screen (NOT redirect to Login)');

        try {
            await expect(LoginPage.btnSubmit).not.toBeDisplayed({ timeout: 20000 });
            console.log('✅ Validation worked: stayed on Register screen');
        } catch (error) {
            throw new Error('❌ TEST FAILED: Registration succeeded with username too long! App redirected to Login screen.');
        }

        // Kiểm tra nút Submit của Register vẫn còn tồn tại
        await expect(RegisterPage.btnSubmit).toBeDisplayed({
            timeout: 8000,
            message: 'Submit button on Register screen disappeared → likely redirected despite long username!'
        });

        console.log('✅ TC_REG_006 PASSED: Registration blocked due to username too long');
    });
});