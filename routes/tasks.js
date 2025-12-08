const {Router}= require('express');
const TaskController =  require('../controllers/task.js');
const router = new Router();
const version = require('../middlewares/versioningMiddleware.js');

// Collection GET
// Http Code : 200
router.get("/tasks", 
    version({
        v1: TaskController.cgetV1, 
        v2:TaskController.cgetV2, 
        default: TaskController.cget
    }));

// Collection POST
// Http Code : 201
router.post("/tasks", TaskController.post);

// Item GET => read
// Http Code : 200, ou 404
router.get("/tasks/:id", TaskController.get);

// Item PUT => update or create
// Http Code : 200 ou 201
router.put("/tasks/:id", TaskController.put);

// Item PATCH => partial update
// Http Code : 200, ou 404
router.patch("/tasks/:id", TaskController.patch);

// Item DELETE => delete
// Http Code : 204, ou 404
router.delete("/tasks/:id", TaskController.delete);




module.exports = router;