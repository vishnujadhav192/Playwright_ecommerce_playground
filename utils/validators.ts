export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Validators {
  static isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email.trim());
  }
}