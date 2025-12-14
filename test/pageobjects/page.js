// test/pageobjects/page.js
export default class Page {
    async open(path = '') {
        // Không cần làm gì đặc biệt với app native
        return browser;
    }

    async hideKeyboard() {
        try {
            if (await browser.isKeyboardShown()) {
                await browser.hideKeyboard();
            }
        } catch (e) {
            // Một số thiết bị không hỗ trợ isKeyboardShown → bỏ qua
        }
    }

    async pause(seconds = 1) {
        await browser.pause(seconds * 1000);
    }

    // === THÊM MỚI: TỰ ĐỘNG SWIPE QUA INTRO ===
    async swipeThroughIntroScreens(numberOfSwipes = 3, pauseAfterEach = 1000) {
        console.log(`-> Đang tự động swipe qua ${numberOfSwipes} màn hình Intro...`);

        const { width, height } = await driver.getWindowRect();

        // Tọa độ swipe từ phải sang trái (80% chiều ngang)
        const startX = width * 0.9;
        const endX = width * 0.1;
        const y = height * 0.5; // Giữa màn hình theo chiều dọc

        for (let i = 0; i < numberOfSwipes; i++) {
            console.log(`   Swipe lần ${i + 1}/${numberOfSwipes}`);
            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: y },
                    { type: 'pointerDown' },
                    { type: 'pause', duration: 300 },
                    { type: 'pointerMove', duration: 600, x: endX, y: y },
                    { type: 'pointerUp' }
                ]
            }]);

            await this.pause(pauseAfterEach / 1000); // Chờ animation
        }

        console.log('✅ Đã đến màn hình Intro cuối (có nút Login)');
    }
}