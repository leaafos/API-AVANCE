const UserModel = require("../models/user.js");

module.exports = {
  cget: async (req, res, next) => {
    res.json(await UserModel.findAll());
  },
  post: async (req, res, next) => {
    const newData = req.body;
    const newUser = await UserModel.create(newData);
    res.status(201).json(newUser);
  },
  get: async (req, res, next) => {
    const user = await UserModel.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  },
  put: async (req, res, next) => {
    const nbDeleted = await UserModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    const newData = req.body;
    const newUser = await UserModel.create({ id: req.params.id, ...newData });
    res.status(nbDeleted === 1 ? 200 : 201).json(newUser);
  },
  patch: async (req, res, next) => {
    /**
     * const result =  await UserModel.update(req.body, {
     * const nbUpdated = result[0];
     * const data = result[0];
     * const updatedUser = data[0];
     *
     * <=> destructuration
     *
     * const [nbUpdated, [updatedUser]] = await UserModel.update(req.body, {
     */
    const [nbUpdated, [updatedUser]] = await UserModel.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (nbUpdated === 0) {
      res.sendStatus(404);
    } else {
      res.json(updatedUser);
    }

    // MySQL
    //
    // if (result === 0) {
    //   res.sendStatus(404);
    // } else {
    //   const user = await UserModel.findByPk(req.params.id);
    //   res.json(user);
    // }
  },
  delete: async (req, res, next) => {
    const nbDeleted = await UserModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (nbDeleted === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  },
  activate: async (req, res, next) => {
    const nbUpdated = await UserModel.update(
      {
        activated: true,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    if (nbUpdated === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  },
};