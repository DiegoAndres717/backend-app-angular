const { Schema, model } = require('mongoose')

const tareaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        trim: true,
        ref: 'Usuario'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Tarea', tareaSchema);