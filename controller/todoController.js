import Todo from "./../model/todo.js";

export const getAllTodos = async (req, res) => {
  try {
    const todo = await Todo.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      todo,
    });
  } catch (error) {
    res.status(404).json({
      message: "todo not found",
      error: error.message,
    });
  }
};

export const createTodo = async (req, res) => {
  try {
    const newTodo = {
      description: req.body.description,
      expiration: req.body.expiration,
      category: req.body.category,
      isCompleted: req.body.isCompleted,
      // daysUntilExpiration: daysUntilExpiration,
    };
    // console.log(newTodo);

    const todo = await Todo.create(newTodo);
    // console.log(todo);

    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to add todo",
      error: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: "Success",
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to update todo",
      error: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "todo not found",
      error: error.message,
    });
  }
};
