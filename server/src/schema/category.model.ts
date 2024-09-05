// import { Document, Schema, model, models } from "mongoose";

// export interface ICategory extends Document {
//   _id: string;
//   userId: string;
//   name: string;
// }

// const CategorySchema = new Schema({
//   name: { type: String, required: true },
//   userId: { type: String, required: true },
// });

// CategorySchema.index({ userId: 1, name: 1 }, { unique: true });

// const CategoryModel = models.Category || model("Category", CategorySchema);

// export default CategoryModel;

// import mongoose from "mongoose";

// interface ICategory {
//   userId: string;
//   name: string;
// }

// const CategorySchema = new mongoose.Schema<ICategory>({
//   name: { type: String, required: true },
//   userId: { type: String, required: true },
// });

// const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);

// export default CategoryModel;

import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  userId: string;
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
});

const CategoryModel = models.Category || model("Category", CategorySchema);

export default CategoryModel;
