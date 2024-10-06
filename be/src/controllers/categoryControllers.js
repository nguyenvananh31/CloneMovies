import ListCate from "../models/categoryModels.js"; // Import model danh mục
import { categoryValidator } from "../validators/category.js"; // Validator kiểm tra dữ liệu danh mục (cần tạo riêng)

export const getAllCategories = async (req, res) => {
  try {
    const categories = await ListCate.find(); // Lấy tất cả danh mục
    if (!categories) {
      return res.status(404).json({ message: "Không có danh mục nào" });
    }
    return res.status(200).json({
      message: "Lấy danh mục thành công",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const getDetailCategory = async (req, res) => {
  try {
    const category = await ListCate.findById(req.params.id); // Lấy chi tiết một danh mục theo id
    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    return res.status(200).json({
      message: "Lấy danh mục thành công",
      data: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error } = categoryValidator.validate(req.body, { abortEarly: false }); // Kiểm tra dữ liệu đầu vào
    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorMessages });
    }

    const category = await ListCate.create(req.body); // Tạo danh mục mới
    if (!category) {
      return res.status(404).json({ message: "Tạo danh mục thất bại" });
    }
    return res.status(201).json({
      message: "Tạo danh mục thành công",
      data: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error } = categoryValidator.validate(req.body, { abortEarly: false }); // Kiểm tra dữ liệu đầu vào
    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorMessages });
    }

    const { id } = req.params; 
    const updatedCategory = await ListCate.findByIdAndUpdate(id, req.body, { new: true }); // Cập nhật danh mục

    if (!updatedCategory) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    return res.status(200).json({
      message: "Cập nhật danh mục thành công",
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await ListCate.findByIdAndDelete(id); // Xóa danh mục theo id

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    return res.status(200).json({
      message: "Xóa danh mục thành công",
      data: category, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
