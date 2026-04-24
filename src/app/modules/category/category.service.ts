import { AppError } from "../../../shared/error/AppError";
import { categoryRepo } from "./category.repository";

export const categoryService = {
  getCategories: async function () {
    return await categoryRepo.getCategories();
  },
  getSingleCategory: async function (id: string) {
    const category = await categoryRepo.getSingleCategory(id);

    if (!category) {
      throw new AppError(404, "Category not found with this id");
    }

    return category;
  },

  createCategory: async function (data: { name: string }) {
    const isCategoryExists = await categoryRepo.getCategoryByName(data.name);

    if (isCategoryExists) {
      throw new AppError(409, "Category already exists");
    }

    return await categoryRepo.createCategory(data);
  },

  updateCategory: async function (id: string, data: { name: string }) {
  const isCategoryExists = await categoryRepo.getSingleCategory(id);

  if (!isCategoryExists) {
    throw new AppError(404, "Category not found with this id");
  }

  const isNameTaken = await categoryRepo.getCategoryByName(data.name);

  if (isNameTaken && isNameTaken.id !== id) {
    throw new AppError(409, "Category name already exists");
  }

  return await categoryRepo.updateCategory(id, data);
},

deleteCategory: async function (id: string) {
  const isCategoryExists = await categoryRepo.getSingleCategory(id);

  if (!isCategoryExists) {
    throw new AppError(404, "Category not found with this id");
  }

  return await categoryRepo.deleteCategory(id);
},
  
};
