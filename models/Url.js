
import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let url = new Schema({
    original: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        unique: true
    }
})

mongoose.models = {};

let Url = mongoose.model('Url', url);

export default Url;