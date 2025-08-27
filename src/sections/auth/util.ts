export const isValidEmail = (email: string) =>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPhone = (phone: string) => /^\d{10}$/.test(phone.trim());
export const isValidPassword = (password: string) =>password.length >= 6;