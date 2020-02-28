const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  cedula: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique:true },
  idInstitucion: { type: String, required: true, trim: false, unique:false },
  password: { type: String, required: true, trim: true }
}, {
    timestamps: true
  });

module.exports = userSchema;
