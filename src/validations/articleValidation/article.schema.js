
import joi from 'joi'

export const articleSchema = joi.object({
    title: joi.string().max(1000).message('Title could not exceed 1000').required(),
    content: joi.string().required(),
    image: joi.any(),
    created_on: joi.date().max('now'),
    likes: joi.number()
})