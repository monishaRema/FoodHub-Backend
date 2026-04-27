import { AppError } from "../../../shared/error/AppError.js";
import { QueryType } from "../../../shared/validation/index.js";
import { userRepo } from "./users.repository.js";
import { UserStatusType } from "./users.validation.js";

export const userService = {
  getUsers: async function (query: QueryType) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    return await userRepo.getUsers(limit, skip);
  },
  updateUserStatus: async function (id: string, payload: UserStatusType) {
    const user = await userRepo.getUserById(id);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if (user.status == payload.status) {
      throw new AppError(409, `User is already ${user.status}`);
    }

    return await userRepo.updateUserStatus(id, payload.status);
  },
};
