import mongoose, { Schema,model} from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

//Returns Fields in JSON format.
UserSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v   //Cleaning Up fields that would be returned.
        delete returnedObject.password // Ensures Hashed Password is not returned to the API user(more Security)
    }
}) 

const User =  model('User', UserSchema)

export default User
