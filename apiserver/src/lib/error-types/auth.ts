export const AuthErrors = {
  EMAIL_EXISTS: {
    type: "EMAIL_EXISTS",
    message: "Email already exists",
    statusCode: 400,
  },
  USERNAME_NOT_AVAILABLE: {
    type: "USERNAME_NOT_AVAILABLE",
    message: "Username is not available",
    statusCode: 400,
  },
} as const;
