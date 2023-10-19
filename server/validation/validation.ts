export function validateEmail(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

export function validateNumber(number: string): boolean {
  const numberPattern = /^\d{2}-\d{2}-\d{2}$/;
  return numberPattern.test(number);
}
