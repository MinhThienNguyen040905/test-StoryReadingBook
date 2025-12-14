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
    }
};