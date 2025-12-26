import LoginPage from '../../../pageobjects/auth/login.page.js';
import HomePage from '../../../pageobjects/home/home.page.js';
import { TEST_USERS } from '../../../data/users.js';

describe('TC_LOG_001: Verify successful login with valid credentials (Happy Path)', () => {

    it('Should login successfully and redirect to Home screen', async () => {
        console.log('--- START TC_LOG_001: SUCCESSFUL LOGIN ---');

        // Tự động swipe qua Intro và vào màn hình Login
        await LoginPage.goToLoginFromIntro();

        // Nhập thông tin đăng nhập hợp lệ
        const validUser = TEST_USERS.ADMIN;
        console.log(`-> Logging in with valid credentials:`);
        console.log(`   Email: ${validUser.email}`);
        console.log(`   Password: ${validUser.password}`);

        await LoginPage.login(validUser.email, validUser.password);

        // Kiểm tra đã chuyển hướng thành công đến Home screen
        console.log('-> Waiting for Home screen to appear...');
        await expect(HomePage.txtTitle).toBeDisplayed({
            timeout: 20000,
            message: 'Login failed or did not redirect to Home screen!'
        });

        console.log('✅ TC_LOG_001 PASSED: Login successful and Home screen displayed');
    });
});