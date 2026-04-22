export const cookieNames = {
  accessToken: "access-token",
  refreshToken: "refresh-token",
} as const;

export type CookieNameKey = keyof typeof cookieNames;
export type CookieNameValue = (typeof cookieNames)[keyof typeof cookieNames];