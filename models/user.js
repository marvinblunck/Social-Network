const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "email is invalid"],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "user"
        }]
    }, {
    toJSON: {
        getters: true,
    },
})
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length 
  })
const User = model('user', userSchema);
module.exports = User;