const MESSAGE_ERROR = {
    username: "Email không hợp lệ",
    password: "Mật khẩu phải ít nhất 6 ký tự",
};

const REGEX = {
    username: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^.{6,}$/,
};

export function validateField(name, value) {
    return REGEX[name]?.test(value) ? "" : MESSAGE_ERROR[name];
}
