
import { QueryType } from "../../../shared/validation/index.js";
import { adminOrdersRepo } from "./admin-order.repository.js";


export const adminOrdersService = {
  getOrders: async function (query: QueryType) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const orders = await adminOrdersRepo.getOrders(limit, skip);

    return orders;
  },
  getSingleOrder: async function (id: string) {
    return await adminOrdersRepo.getSingleOrder(id);
  },
};
