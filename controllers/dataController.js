const data = require("../modals/data");

//GET

const getAllUserProjects = async (req, res) => {
  try {
    res.status(200).json(data.getAllProjects(req.user.username));
  } catch {
    res.sendStatus(400);
  }
};

const getSingleUserProject = async (req, res) => {
  try {
    res
      .status(200)
      .json(data.getSingleProject(req.user.username, req.params.projectTitle));
  } catch {
    res.sendStatus(400);
  }
};

const getAllUserToDosForSingleProject = async (req, res) => {
  try {
    res
      .status(200)
      .json(
        data.getAllToDosForSingleProject(
          req.user.username,
          req.params.projectTitle
        )
      );
  } catch {
    res.sendStatus(400);
  }
};

const getSingleUserToDoForSingleProject = async (req, res) => {
  try {
    res
      .status(200)
      .json(
        data.getSingleToDoForSingleProject(
          req.user.username,
          req.params.projectTitle,
          req.params.toDoTitle
        )
      );
  } catch {
    res.sendStatus(400);
  }
};

const getAllUserTasksForSingleToDo = async (req, res) => {
  try {
    res
      .status(200)
      .json(
        data.getAllTasksForSingleToDo(
          req.user.username,
          req.params.projectTitle,
          req.params.toDoTitle
        )
      );
  } catch {
    res.sendStatus(400);
  }
};

const getSingleUserTaskForSingleToDo = async (req, res) => {
  try {
    res
      .status(200)
      .json(
        data.getSingleTaskForSingleToDo(
          req.user.username,
          req.params.projectTitle,
          req.params.toDoTitle,
          req.params.taskTitle
        )
      );
  } catch {
    res.sendStatus(400);
  }
};

//POST

const postNewProject = async (req, res) => {
  try {
    const userData = {
      type: "Project",
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      dateAdded: new Date(),
      completed: false,
      toDos:[]
    };
    data.postNewProject(req.user.username, userData);
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

const postNewTodo = async (req, res) => {
  try {
    const userData = {
      type: "ToDo",
      projectTitle: req.body.projectTitle,
      title: req.body.title,
      id: req.body.id,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      dateAdded: new Date(),
      complete: false,
      tasks:[]
    };
    data.postNewTodoToProject(req.user.username, userData);
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

const postNewTask = async (req, res) => {
  try {
    const userData = {
      type: "Task",
      projectTitle: req.body.projectTitle,
      toDoTitle: req.body.toDoTitle,
      id: req.body.id,
      description: req.body.description,
      dateAdded: new Date(),
      completed: false,
    };
    data.postNewTaskToTodo(req.user.username, userData);
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

//EDIT

const editProject = async (req, res) => {
  try {
    data.changeProject(req.user.username, req.body);
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

const editToDo = async (req, res) => {
  try {
    data.changeToDo(req.user.username, req.body);
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

const editTask = async (req, res) => {
  try {
    data.changeTask(req.user.username, req.body);
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

//COMPLETE

const completeProject = async (req, res) => {
  try {
    data.projectComplete(
      req.user.username,
      req.params.projectTitle,
      req.body.complete
    );
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

const completeToDo = async (req, res) => {
  try {
    data.toDoComplete(
      req.user.username,
      req.params.projectTitle,
      req.body.complete
    );
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

const completeTask = async (req, res) => {
  try {
    data.taskComplete(
      req.user.username,
      req.params.projectTitle,
      req.params.toDoTitle,
      req.params.taskId,
      req.body.complete
    );
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};


//DELETE

const deleteProject = async (req, res) => {
  try {
    data.removeProject(req.user.username, req.params.projectTitle);
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

const deleteToDo = (req, res) => {
  try {
    data.removeToDo(
      req.user.username,
      req.params.projectTitle,
      req.params.toDoTitle,
      req.params.taskTitle
    );
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

const deleteTask = (req, res) => {
  try {
    data.removeTask(
      req.user.username,
      req.params.projectTitle,
      req.params.toDoTitle,
      req.params.taskId
    );
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

module.exports = {
  getAllUserProjects,
  getSingleUserProject,
  getAllUserToDosForSingleProject,
  getSingleUserToDoForSingleProject,
  getAllUserTasksForSingleToDo,
  getSingleUserTaskForSingleToDo,
  postNewProject,
  postNewTodo,
  postNewTask,
  editProject,
  editToDo,
  editTask,
  completeProject,
  completeToDo,
  completeTask,
  deleteProject,
  deleteToDo,
  deleteTask,
};
