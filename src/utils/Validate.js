const MESSAGE_ERROR = {
    username: "Invalid email",
    password: "Password must be at least 6 characters",
};

const REGEX = {
    username: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^.{6,}$/,
};

export function validateField(name, value) {
    return REGEX[name]?.test(value) ? "" : MESSAGE_ERROR[name];
}
