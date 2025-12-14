import fs from 'fs';
import path from 'path';

export const config = {
    // 1. Cấu hình Runner & Appium Server
    runner: 'local',
    hostname: 'localhost',
    port: 4723,
    path: '/wd/hub', // Quan trọng cho Appium 1.x

    // 2. Chỉ định file test
    specs: [
        './test/specs/**/*.js'
    ],

    // 3. Khai báo thiết bị (Capabilities)
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'My Real Phone',
        'appium:udid': '1153337455003551', // Mã thiết bị của bạn
        'appium:appPackage': 'com.example.frontend',
        'appium:appActivity': '.activity.MainActivity',
        'appium:noReset': false,
        'appium:newCommandTimeout': 3600,
        'appium:ensureWebviewsHavePages': true,
        'appium:nativeWebScreenshot': true,
        'appium:connectHardwareKeyboard': true
    }],

    // 4. Cấu hình Log & Timeout
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 20000, // Chờ 20s cho element xuất hiện
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // 5. Framework
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000 // 2 phút tối đa cho 1 test case
    },

    // --- HOOKS ---

    // Chạy 1 lần trước khi bắt đầu: Dọn dẹp thư mục ảnh cũ
    onPrepare: function (config, capabilities) {
        const dir = './screenshots';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } else {
            // Xóa file cũ để tránh đầy ổ cứng
            const files = fs.readdirSync(dir);
            for (const file of files) {
                fs.unlinkSync(path.join(dir, file));
            }
        }
    },

    // Chụp màn hình khi Test Failed
    afterTest: async function (test, context, { error }) {
        if (error) {
            const timestamp = Date.now();
            // Xóa ký tự đặc biệt trong tên test để làm tên file
            const testName = test.title.replace(/[^a-zA-Z0-9]/g, '_');
            const filePath = `./screenshots/ERROR_${testName}_${timestamp}.png`;

            await browser.saveScreenshot(filePath);
            console.log(`📸 Đã chụp màn hình lỗi: ${filePath}`);
        }
    },

    // Reset app trước mỗi test case để luôn về Intro screen
    beforeEach: async function () {
        console.log('🔄 Resetting app to initial state...');
        await driver.reset(); // Cách mạnh nhất: xóa data và khởi động lại app như mới
        // Nếu reset() chậm hoặc không hoạt động tốt, dùng cách sau:
        // await driver.terminateApp('com.example.frontend');
        // await driver.activateApp('com.example.frontend');

        await browser.pause(6000); // Chờ app load xong Intro screen
        console.log('✅ App ready at Intro screen');
    },
};