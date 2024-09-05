import { Request, Response } from "express";
import CategoryModel from "../schema/category.model";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const categories = await CategoryModel.find({ userId: userId });

    if (categories.length === 0) {
      return res.status(404).send("No category found.");
    }

    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).send("User ID is required.");
    }

    const { name } = req.body;

    const existingCategory = await CategoryModel.findOne({ userId, name });

    if (existingCategory) {
      return res
        .status(400)
        .send("Category name already exists for this user.");
    }

    const newCategory = new CategoryModel({
      userId,
      name,
    });

    console.log(newCategory);

    const savedCategory = await newCategory.save();

    res.status(200).send(savedCategory);
  } catch (err: any) {
    if (err.code === 11000) {
      return res
        .status(400)
        .send("Category name already exists for this user.");
    }

    res.status(500).send(err);
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).send("Category ID is required.");
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).send("Category not found.");
    }

    res.status(200).send({ message: "Category deleted successfully." });
  } catch (err) {
    res.status(500).send(err);
  }
};
