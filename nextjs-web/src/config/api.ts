export const apiBaseUrl: string = process.env.SERVER_BASE_URL ?? "http://localhost:8080"

export const authUrl = {
  signUp: `${apiBaseUrl}/auth/signup`,
  signIn: `${apiBaseUrl}/auth/login`
}
