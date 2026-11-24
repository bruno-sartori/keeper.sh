// Usernames are either a plain handle (letters, numbers, dots, underscores, hyphens)
// or an email address. An email is only used as a login name: the stored account email
// keeps the `@local` suffix, so it is never treated as a verified address for linking.

const HANDLE_PATTERN = /^[a-zA-Z0-9._-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

const USERNAME_FORMAT_MESSAGE =
  "username can be letters, numbers, dots, underscores and hyphens, or an email address";

const isEmailUsername = (value: string): boolean => EMAIL_PATTERN.test(value);

/** Trims, and lowercases emails so the same address always finds the same account. */
const normalizeUsername = (value: string): string => {
  const trimmed = value.trim();
  return isEmailUsername(trimmed) ? trimmed.toLowerCase() : trimmed;
};

const isValidUsername = (
  value: string,
  limits: { minUsernameLength: number; maxUsernameLength: number },
): boolean => {
  if (value.length < limits.minUsernameLength) {
    return false;
  }
  if (isEmailUsername(value)) {
    return value.length <= MAX_EMAIL_LENGTH;
  }
  return value.length <= limits.maxUsernameLength && HANDLE_PATTERN.test(value);
};

export { USERNAME_FORMAT_MESSAGE, isEmailUsername, isValidUsername, normalizeUsername };
