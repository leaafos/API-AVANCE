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
    get: (req, res, next) => {},
    patch: (req, res, next) => {},
    delete: async (req, res, next) => {
        await TaskModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.sendStatus(204);
    }
};