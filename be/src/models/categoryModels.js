import mongoose from "mongoose";
const cateSchema = new mongoose.Schema({

  name: { 
    type: String, 
    required: true,
    trim: true, 
    unique: true,
    minlength: 3, 
  },
  status: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true, 
  versionKey: false 
});


export default mongoose.model("ListCate", cateSchema);