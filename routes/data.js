const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const userController = require('../controllers/userController');

router.get("/", userController.authenticateToken, dataController.getAllUserProjects);
router.get("/:projectTitle", userController.authenticateToken, dataController.getSingleUserProject);
router.get('/:projectTitle/toDos', userController.authenticateToken, dataController.getAllUserToDosForSingleProject);
router.get('/:projectTitle/:toDoTitle', userController.authenticateToken, dataController.getSingleUserToDoForSingleProject);
router.get('/:projectTitle/:toDoTitle/tasks', userController.authenticateToken, dataController.getAllUserTasksForSingleToDo);
router.get('/:projectTitle/:toDoTitle/:taskTitle', userController.authenticateToken, dataController.getSingleUserTaskForSingleToDo);

router.post('/addProject', userController.authenticateToken, dataController.postNewProject);
router.post('/addToDo', userController.authenticateToken, dataController.postNewTodo);
router.post('/addTask', userController.authenticateToken, dataController.postNewTask);

router.put('/:projectTitle/edit', userController.authenticateToken, dataController.editProject);
router.put('/:toDoTitle/edit', userController.authenticateToken, dataController.editToDo );
router.put('/:taskTitle/edit', userController.authenticateToken, dataController.editTask);

router.delete('/:projectTitle/complete', userController.authenticateToken, dataController.completeProject);
router.delete('/:projectTitle/:toDoTitle/complete', userController.authenticateToken, dataController.completeToDo );
router.delete('/:projectTitle/:toDoTitle/:taskId/complete', userController.authenticateToken, dataController.completeTask);

router.delete('/:projectTitle/delete', userController.authenticateToken, dataController.deleteProject);
router.delete('/:projectTitle/:toDoTitle/delete', userController.authenticateToken, dataController.deleteToDo );
router.delete('/:projectTitle/:toDoTitle/:taskId/delete', userController.authenticateToken, dataController.deleteTask);

module.exports = router;