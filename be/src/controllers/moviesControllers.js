import ListMovies from "../models/moviesModels.js"
import ListCate from "../models/categoryModels.js"
import { moviesValidator } from "../validators/movies.js"

export const getAllMovies = async(req, res) => {
    try {
        const movies = await ListMovies.find().populate("category")
        if(!movies) {
           return res.status(404).json({ message: "Lấy dữ liệu thất bại" })
        }
            return res.status(200).json({
                message: "Lấy dữ liệu thành công",
                data:movies,
            })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Kết nối với server thất bại" })
    }
        
}
export const getDetailMovies = async(req, res) => {
    try {
        const movie = await ListMovies.findById(req.params.id).populate("category");
        if(!movie) {
           return res.status(404).json({ message: "Lấy dữ liệu thất bại" })
        }
            return res.status(200).json({
                message: "Lấy dữ liệu thành công",
                data:movie,
            })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Kết nối với server thất bại" })
    }
        
}
export const createMovie = async (req, res) => {
    try {
      const { error } = moviesValidator.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorMessages });
      }
  
      // Kiểm tra danh mục có tồn tại hay không
      const categories = await ListCate.find({ _id: { $in: req.body.category } });
      if (categories.length !== req.body.category.length) {
        return res.status(400).json({ message: "Danh mục không hợp lệ" });
      }
  
      const movie = await ListMovies.create(req.body);
      if (!movie) {
        return res.status(404).json({ message: "Tạo phim thất bại" });
      }
      return res.status(201).json({
        message: "Tạo phim thành công",
        data: movie,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Kết nối với server thất bại" });
    }
  };

  export const updateMovie = async (req, res) => {
    try {
      const { error } = moviesValidator.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorMessages });
      }
  
      const { id } = req.params;
  
      // Kiểm tra danh mục có tồn tại hay không
      const categories = await ListCate.find({ _id: { $in: req.body.category } });
      if (categories.length !== req.body.category.length) {
        return res.status(400).json({ message: "Danh mục không hợp lệ" });
      }
  
      const updatedMovie = await ListMovies.findByIdAndUpdate(id, req.body, { new: true }).populate("category"); // Populate để lấy thông tin danh mục sau khi cập nhật
  
      if (!updatedMovie) {
        return res.status(404).json({ message: "Phim không tồn tại" });
      }
  
      return res.status(200).json({
        message: "Cập nhật phim thành công",
        data: updatedMovie,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Kết nối với server thất bại" });
    }
  };
  
export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params; 

        const movie = await ListMovies.findByIdAndDelete(id); 

        if (!movie) {
            return res.status(404).json({ message: "Phim không tồn tại" });
        }

        return res.status(200).json({
            message: "Xóa phim thành công",
            data: movie,  
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Kết nối với server thất bại" });
    }
};