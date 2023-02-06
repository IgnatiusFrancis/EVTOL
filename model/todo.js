import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    //   select: false,
    // },

    isCompleted: {
      type: String,
      enum: ["incomplete", "complete"],
      default: "incomplete",
    },
    category: {
      type: String,
      enum: ["personal", "work"],
      required: true,
    },
    expiration: { type: Date, default: new Date(), required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Todo = mongoose.model("Todo", TodoSchema);

// module.exports = Todo;
export default Todo;
