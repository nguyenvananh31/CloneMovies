import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength:3,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
        lowercase: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
    
      password: {
        type: String,
        required: true,
        minlength: 8, 
       
      },
      role: {
        type: [String], 
        required: true,
        default: ['menter']
      },
      status: { 
        type: Number, 
        default: 0 
      }
    },{
        timestamps: true, 
        versionKey: false 
    });


export default mongoose.model("Users", usersSchema);