import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    article:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    sender: { type: String, required: true },
    comment: { type: String, required: true }
})
const Comment = mongoose.model('Comment', commentSchema)
export default Comment