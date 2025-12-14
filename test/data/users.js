export const TEST_USERS = {
    ADMIN: {
        email: 'admin1@gmail.com',
        password: 'admin123', // Pass đúng
        name: 'Admin User'
    },
    INVALID_USER: {
        email: 'wrong@gmail.com',
        password: 'wrongpassword'
    },
    NEW_USER: {
        email: `test.user${new Date().getTime()}@example.com`, // Email động để không bị trùng
        username: 'nguoidungmoi',
        password: 'Password@123', // Mật khẩu mạnh (Chữ hoa, thường, số, ký tự đặc biệt)
        confirmPassword: 'Password@123'
    },
    EMPTY_USERNAME_USER: {  // Thêm mới cho test case username empty
        email: `test.emptyuser${new Date().getTime()}@example.com`,
        username: '',  // Username rỗng
        password: 'Password@123',
        confirmPassword: 'Password@123'
    },
    // THÊM MỚI CHO TC_REG_003
    INVALID_CHARS_USERNAME_USER: {
        email: `test.invalidchars${new Date().getTime()}@example.com`,
        username: 'user@#!$',  // Chứa ký tự đặc biệt không hợp lệ
        password: 'Password@123',
        confirmPassword: 'Password@123'
    },
    INVALID_EMAIL_FORMAT_USER: {
        email: `testuser${new Date().getTime()}`,  // Không có @ và domain
        username: 'validuser123',
        password: 'Password@123',
        confirmPassword: 'Password@123'
    },
    // THÊM MỚI CHO TC_REG_005
    SHORT_USERNAME_USER: {
        email: `test.shortuser${new Date().getTime()}@example.com`,
        username: 'ab',  // Chỉ 2 ký tự – quá ngắn
        password: 'Password@123',
        confirmPassword: 'Password@123'
    },
    LONG_USERNAME_USER: {
        email: `test.longuser${new Date().getTime()}@example.com`,
        username: 'thisisaverylongusernameexceedingfiftycharacterslongtest123',  // 51 ký tự – quá dài
        password: 'Password@123',
        confirmPassword: 'Password@123'
    },
    // THÊM MỚI CHO TC_REG_007
    WEAK_PASSWORD_USER: {
        email: `test.weakpass${new Date().getTime()}@example.com`,
        username: 'validuser123',
        password: 'weakpass',  // 8 ký tự, chỉ chữ thường, không số, không ký tự đặc biệt
        confirmPassword: 'weakpass'
    },
    // THÊM MỚI CHO TC_REG_008
    MISMATCHED_PASSWORD_USER: {
        email: `test.mismatch${new Date().getTime()}@example.com`,
        username: 'validuser123',
        password: 'Password@123',           // Mật khẩu chính
        confirmPassword: 'Different@123'    // Không khớp
    },
    EXISTING_USERNAME_USER: {
        email: `test.duplicateuser${new Date().getTime()}@example.com`,  // Email mới, không trùng
        username: 'nguoidungmoi',  // Username đã tồn tại trong hệ thống
        password: 'Password@123',
        confirmPassword: 'Password@123'
    }


};