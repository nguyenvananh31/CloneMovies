import Users from "../models/usersModels.js"; 
import { userValidationSchema } from "../validators/users.js"; 

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find(); 
    if (!users) {
      return res.status(404).json({ message: "Không có users nào" });
    }
    return res.status(200).json({
      message: "Lấy users thành công",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const getDetailUsers = async (req, res) => {
  try {
    const users = await Users.findById(req.params.id); 
    if (!users) {
      return res.status(404).json({ message: "Users không tồn tại" });
    }
    return res.status(200).json({
      message: "Lấy Users thành công",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false }); 
    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorMessages });
    }

    const users = await Users.create(req.body);
    if (!users) {
      return res.status(404).json({ message: "Tạo thất bại" });
    }
    return res.status(201).json({
      message: "Tạo thành công",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorMessages });
    }

    const { id } = req.params; 
    const users = await Users.findByIdAndUpdate(id, req.body, { new: true });

    if (!users) {
      return res.status(404).json({ message: "Users không tồn tại" });
    }

    return res.status(200).json({
      message: "Cập nhật thành công",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await Users.findByIdAndDelete(id);

    if (!users) {
      return res.status(404).json({ message: "Users không tồn tại" });
    }

    return res.status(200).json({
      message: "Xóa thành công",
      data: users, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
