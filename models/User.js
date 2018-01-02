import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// set up a mongoose model
export default mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));