import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true},
    // username: { type: String, unique: true, required: true, dropDups: true },
    email: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    created_on: { type: Date, default: Date.now }
})
const User = mongoose.model('User', userSchema)
export default User