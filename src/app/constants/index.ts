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

export const RequestParts = {
  body:"body",
  query:"query",
  params:"params"
} as const 

export type ReqPartsKey = keyof typeof RequestParts;
export type ReqPartsValue = (typeof RequestParts)[keyof typeof RequestParts];


