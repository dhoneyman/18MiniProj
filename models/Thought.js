const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280,
        },
        createAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            reactions: [reactionsSchema]
        }
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
});









