import LoginPage from '../../../pageobjects/auth/login.page.js';
import RegisterPage from '../../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_REG_004: Register with invalid email format', () => {

    it('Should prevent registration when email format is invalid', async () => {
        console.log('--- START TC_REG_004: INVALID EMAIL FORMAT ---');

        await LoginPage.goToLoginFromIntro();

        await RegisterPage.goToRegisterPage();

        const invalidUser = TEST_USERS.INVALID_EMAIL_FORMAT_USER;
        console.log(`-> Attempting registration with invalid email: "${invalidUser.email}"`);

        await RegisterPage.register(invalidUser);

        console.log('-> Checking: should STAY on Register screen (NOT redirect to Login)');

        // Cách 1: Chờ đủ lâu và kiểm tra KHÔNG redirect
        try {
            await expect(LoginPage.btnSubmit).not.toBeDisplayed({ timeout: 20000 });
            console.log('✅ Validation worked: stayed on Register screen');
        } catch (error) {
            throw new Error('❌ TEST FAILED: Registration succeeded with invalid email format! App redirected to Login screen.');
        }

        // Cách 2 (khuyến nghị): Kiểm tra nút Submit của Register vẫn còn
        await expect(RegisterPage.btnSubmit).toBeDisplayed({
            timeout: 8000,
            message: 'Submit button on Register screen disappeared → likely redirected despite invalid email!'
        });

        console.log('✅ TC_REG_004 PASSED: Registration blocked due to invalid email format');
    });
});