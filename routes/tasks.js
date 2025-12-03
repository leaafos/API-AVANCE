const {Router}= require('express');
const TaskController =  require('../controllers/task.js');
const router = new Router();

router.get("/tasks", TaskController.cget);
router.post("/tasks", TaskController.post);
router.get("/tasks/:id", TaskController.get);
router.patch("/tasks/:id", TaskController.patch); // fait une modification partielle contrairement a put qui remplace toute la ressource et crée une valeur si elle n'existe pas
router.delete("/tasks/:id", TaskController.delete);


module.exports = router;