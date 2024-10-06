import Joi from "joi";

export const moviesValidator = Joi.object({
    name: Joi.string().required().min(3).lowercase(),
    thurl_url: Joi.array().items(Joi.string().uri()).required(), 
    content: Joi.string().required().min(10).max(255),
    type: Joi.string().required().valid('series', 'movie'), 
    category: Joi.array().items(Joi.string()).required(), 
    episode_total: Joi.number().required(),
    views: Joi.number().default(0),
    status: Joi.number().default(0),
    timestamps: Joi.number().required(),
    isNav:Joi.string().required().valid('phim-bo', 'phim-le','chieu-rap','tv-show','hoat-hinh'),

   
    episodes: Joi.array().items(
      Joi.object({
        name: Joi.string().required(), 
        url_video: Joi.string().uri().required()
      })
    ).required(),
});