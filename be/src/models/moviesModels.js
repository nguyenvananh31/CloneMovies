import mongoose from "mongoose";

const EpisodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url_video: {
    type: String,
    required: true,
  },
});

const MoviesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      lowercase: true,
      unique: true,
      trim: true,
    },
    thurl_url: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 10,
    },
    type: {
      type: String,
      required: true,
      enum: ['series', 'movie', ]
    },
    isNav: {
      type: String,
      required: true,
      enum: ['phim-bo', 'phim-le','chieu-rap','tv-show','hoat-hinh' ]
    },
 
    episode_total: {
      type: Number,
      default: 1,
    },
    episodes: {
      type: [EpisodeSchema], 
      required: true, 
    },
    timestamps: {
      type:Number,
      required:true,
    },
    category: {
      type:[String],
      required: true,
    },
    
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 0,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("ListMovies", MoviesSchema);
