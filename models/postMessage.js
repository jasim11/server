import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    username : [String],
    identifier : [String],
    firstname : [String],
    lastname : [String],

    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;