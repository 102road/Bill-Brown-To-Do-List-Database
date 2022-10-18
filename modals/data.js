const path = require("path");
const fs = require("fs");

// utility functions
const createUserJSONfile = (user) => {
  return path.join(__dirname, `../data/${user}.json`);
};

const readData = (path) => {
  return JSON.parse(fs.readFileSync(path));
};

const writeData = (user, data) => {
  const userDataFile = createUserJSONfile(user);
  fs.writeFileSync(userDataFile, JSON.stringify(data), "utf-8", (err) => {
    if (err) {
      console.log("There was an error when attempting to add data", err);
    }
  });
};

// get functions

const getAllProjects = (user) => {
  return readData(createUserJSONfile(user));
};

const getSingleProject = (user, projectTitle) => {
  const projects = getAllProjects(user);
  const singleProject = projects.find(
    (project) => project.title === projectTitle
  );
  return singleProject;
};

const getAllToDosForSingleProject = (user, projectTitle) => {
  const project = getSingleProject(user, projectTitle);
  const toDos = project.toDos;
  return toDos;
};

const getSingleToDoForSingleProject = (user, projectTitle, toDoTitle) => {
  const toDos = getAllToDosForSingleProject(user, projectTitle);
  const toDo = toDos.find((toDo) => toDo.title === toDoTitle);
  return toDo;
};

const getAllTasksForSingleToDo = (user, projectTitle, toDoTitle) => {
  const toDo = getSingleToDoForSingleProject(user, projectTitle, toDoTitle);
  const tasks = toDo.tasks;
  return tasks;
};

const getSingleTaskForSingleToDo = (user, projectTitle, toDoTitle, taskId) => {
  const tasks = getAllTasksForSingleToDo(user, projectTitle, toDoTitle);
  const task = tasks.find((task) => task.id === taskId);
  return task;
};

// post functions

// takes in an edited project and replaces itself within the array of projects with the edited version
const postNewData = (user, projectTitle, project) => {
  const projects = getAllProjects(user);
  const projectIndex = projects.findIndex(
    (project) => project.title === projectTitle
  );
  projects.fill(project, projectIndex, projectIndex + 1);
  writeData(user, projects);
};

const postNewProject = (user, userData) => {
  const projects = getAllProjects(user);
  projects.push(userData);
  writeData(user, projects);
};

const postNewTodoToProject = (user, userData) => {
  const selectedProject = getSingleProject(user, userData.projectTitle);
  selectedProject.toDos.push(userData);
  postNewData(user, userData.projectTitle, selectedProject);
};

const postNewTaskToTodo = (user, userData) => {
  const toDos = getAllToDosForSingleProject(user, userData.projectTitle);
  const index = toDos.findIndex(
    (toDo) => toDo.projectTitle === userData.projectTitle
  );
  const selectedProject = getSingleProject(user, userData.projectTitle);
  selectedProject.toDos[index].tasks.push(userData);
  postNewData(user, userData.projectTitle, selectedProject);
};

// edit functions
const changeProject = (user, userData) => {
  const project = getSingleProject(user, userData.prevProjectTitle);
  const editedProject = {
    title: userData.title,
    id: project.id,
    description: userData.description,
    date: userData.date,
    time: userData.time,
    dateAdded: project.dateAdded,
    completed: false,
    toDos: project.toDos,
  };
  postNewData(user, userData.projectTitle, editedProject);
};

const changeToDo = (user, userData) => {
  const toDo = getSingleToDoForSingleProject(
    user,
    userData.prevProjectTitle,
    userData.prevToDoTitle
  );
  const editedToDo = {
    projectTitle: toDo.projectTitle,
    title: userData.title,
    id: toDo.id,
    description: userData.description,
    date: userData.date,
    time: userData.time,
    dateAdded: toDo.dateAdded,
    complete: false,
    tasks: toDo.tasks,
  };
  const project = getSingleProject(user, userData.projectTitle);
  const index = project.toDos.findIndex(
    (toDo) => toDo.toDoTitle === userData.toDoTitle
  );
  project.toDos.fill(editedToDo, index, index + 1);
  postNewData(user, userData.projectTitle, project);
};

const changeTask = (user, userData) => {
  const editedTask = {
    projectTitle: userData.projectTitle,
    toDoTitle: userData.toDoTitle,
    title: userData.title,
    id: userData.id,
    description: userDatadescription,
    date: userData.date,
    time: userData.time,
    dateAdded: new Date(),
    complete: false,
  };
  const toDo = getSingleToDoForSingleProject(
    user,
    userData.projectTitle,
    userData.toDoTitle
  );
  const index = toDo.tasks.findIndex((task) => task.title === userData.title);
  toDo.tasks.fill(editedTask, index, index + 1);
  changeToDo(user, toDo);
};

//complete functions

const projectComplete = (user, projectTitle, complete) => {
  const project = getSingleProject(user, projectTitle);
  project.complete = complete;
  postNewData(user, projectTitle, project);
};

const toDoComplete = (user, projectTitle, toDoTitle, complete) => {
  const toDo = getSingleToDoForSingleProject(user, projectTitle, toDoTitle);
  toDo.complete = complete;
  const project = getSingleProject(user, projectTitle);
  const index = project.toDos.findIndex((toDo) => toDo.title === toDoTitle);
  project.toDos.fill(toDo, index, index + 1);
  postNewData(user, projectTitle, project);
};

const taskComplete = (user, projectTitle, toDoTitle, taskId, complete) => {
  const task = getSingleTaskForSingleToDo(
    user,
    projectTitle,
    toDoTitle,
    taskTitle
  );
  task.complete = complete;
  const toDo = getSingleToDoForSingleProject(user, projectTitle, toDoTitle);
  const index = toDo.tasks.findIndex((task) => task.id === taskId);
  toDo.tasks.fill(task, index, index + 1);
  const project = getSingleProject(user, projectTitle);
  const projectIndex = project.toDos.findIndex(
    (toDo) => toDo.title === toDoTitle
  );
  project.toDos.fill(toDo, projectIndex, projectIndex + 1);
  postNewData(user, projectTitle, project);
};

// delete functions
const removeProject = (user, projectTitle) => {
  const projects = getAllProjects(user);
  projects.filter((project) => {
    project.title !== projectTitle;
  });
  writeData(user, projects);
};

const removeToDo = (user, projectTitle, toDoTitle) => {
  const project = getSingleProject(user, projectTitle);
  const newToDos = project.toDos.filter((toDo) => {
    toDo.title !== toDoTitle;
  });
  project.toDos = newToDos;
  postNewData(user, projectTitle, project);
};

const removeTask = (user, projectTitle, toDoTitle, taskId) => {
  const toDo = getSingleToDoForSingleProject(user, projectTitle, toDoTitle);

  const newTasks = toDo.tasks.filter((task) => {
    task.id !== taskId;
  });

  toDo.tasks = newTasks;

  const project = getSingleProject(user, projectTitle);

  const index = project.toDos.findIndex((toDo) => toDo.title === toDoTitle);

  project.toDos.fill(toDo, index, index + 1);

  postNewData(user, projectTitle, project);
};

module.exports = {
  getAllProjects,
  getSingleProject,
  getAllToDosForSingleProject,
  getSingleToDoForSingleProject,
  getAllTasksForSingleToDo,
  getSingleTaskForSingleToDo,
  postNewProject,
  postNewTodoToProject,
  postNewTaskToTodo,
  changeProject,
  changeToDo,
  changeTask,
  projectComplete,
  toDoComplete,
  taskComplete,
  removeProject,
  removeToDo,
  removeTask,
};
