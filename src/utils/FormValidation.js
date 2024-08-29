export const FormValidation = (email, password, fullName) => {
    const isEmailvalid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]{8,}$/.test(password);
    const isfullNameValid = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/.test(fullName);

    if(!isEmailvalid) return "Email is not valid";
    if(!isPasswordValid) return "Password is not valid";
    if(!isfullNameValid) return "Full name must be at least 4 characters";

    return null;
}