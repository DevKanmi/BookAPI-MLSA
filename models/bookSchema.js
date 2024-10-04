import { Schema, model } from "mongoose";

const bookSchema = Schema({
    title :{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },

    genre: {
        type: String, 
        enum : ['fiction', 'nonfiction', 'horror', 'comedy', 'romance', 'self-help', 'finance']
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

bookSchema.set('toJSON', {
    tranform: (document,requestedObject) =>{
        requestedObject.id = requestedObject._id.toString()
        delete requestedObject._id
        delete requestedObject.__v
    }
})

const Book = model('Book', bookSchema)

export default Book