const TaskModel = require('../models/task.js');

module.exports = {
    cget: async (req, res, next) => {
        res.json(await TaskModel.findAll());
    },
    post: async (req, res, next) => {
        const newData = req.body;
        const newTask = await TaskModel.create(newData);
        res.status(201).json(newTask);
    },
    get: async (req, res, next) => {
        const task = await TaskModel.findByPk(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.sendStatus(404);
        }
    },
    put: async (req, res, next) => {
        const nbDeleted = await TaskModel.destroy({
            where: {
                id: req.params.id
            }
        });
        const newData = req.body;
        const newTask = await TaskModel.create({id: req.params.id, ...newData});
        res.status(nbDeleted === 1 ? 200 : 201).json(newTask);
        },
    patch: async (req, res, next) => {
        const [nbUpdated, [updatedTask]] = await TaskModel.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        });
        if (nbUpdated === 0) {
            res.sendStatus(404);
        } else {
            res.json(updatedTask);
        }

        // MYSQL
        // if(result === 0){
        //     res.sendStatus(404);
        // } else {
        //     const task = await TaskModel.findByPk(req.params.id);
        //     res.json(task);
        // }
    },
    delete: async (req, res, next) => {
        const nbDeleted = await TaskModel.destroy({
            where: {
                id: req.params.id
            }
        });
        if (nbDeleted === 0) {
            return res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    }
};

// ce qui doit être renvoyé dans les routes