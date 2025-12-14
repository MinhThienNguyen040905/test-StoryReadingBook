import LoginPage from '../../../pageobjects/auth/login.page.js';
import RegisterPage from '../../../pageobjects/auth/register.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_REG_001: Register successfully with valid data', () => {

    it('Should register new user and redirect to Login screen', async () => {
        console.log('--- START TC_REG_001: HAPPY PATH REGISTRATION ---');

        // App đã được reset → đang ở Intro
        await LoginPage.goToLoginFromIntro();

        await RegisterPage.goToRegisterPage();

        const user = TEST_USERS.NEW_USER;
        console.log(`-> Registering with email: ${user.email}`);
        await RegisterPage.register(user);

        console.log('-> Expecting redirect to Login screen...');
        await expect(LoginPage.btnSubmit).toBeDisplayed({
            timeout: 20000,
            message: 'Registration failed - did not redirect to Login screen!'
        });

        console.log('✅ TC_REG_001 PASSED');
    });
});