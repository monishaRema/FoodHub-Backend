export const cookieNames = {
  accessToken: "access-token",
  refreshToken: "refresh-token",
} as const;

export type CookieNameKey = keyof typeof cookieNames;
export type CookieNameValue = (typeof cookieNames)[keyof typeof cookieNames];


export const UserRole = {
 ADMIN: "ADMIN",
 CUSTOMER: "CUSTOMER",
 PROVIDER: "PROVIDER"
} as const;

export type UserRoleKey = keyof typeof UserRole;
export type UserRoleValue = (typeof UserRole)[keyof typeof UserRole];


