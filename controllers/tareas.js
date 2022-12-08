const Tarea = require("../models/Tarea");

const createTarea = async (req, res) => {
  const { nombre } = req.body;
  const id = req.uid;

  const nuevaTarea = new Tarea({ nombre, creator: id });

  const tarea = await nuevaTarea.save();
  res.json({
    ok: true,
    msg: "Tarea created",
    tarea,
  });
};

const readTarea = async (req, res) => {
  const id = req.uid;
  try {
    const tareas = await Tarea.find({ creator: id }).sort({ createdAt: -1 });
    return res.json({
      ok: true,
      tareas,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: "Tarea not found",
    });
  }
};

const updateTarea = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const tarea = await Tarea.findByIdAndUpdate(id, { nombre }, { new: true });
    return res.json({
      ok: true,
      msg: 'Tarea updated',
      tarea,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: "Tarea not update",
    });
  }
};

const deleteTarea = async (req, res) => {
        const { id } = req.params;
        try {
          const tarea = await Tarea.findByIdAndDelete(id);
          return res.json({
            ok: true,
            msg: 'Tarea deleted',
            tarea,
          });
        } catch (error) {
          res.status(404).json({
            ok: false,
            msg: "Tarea not Delete",
          });
        }
      };

module.exports = {
  createTarea,
  readTarea,
  updateTarea,
  deleteTarea
};
