import {Schema, model, Document} from 'mongoose';

const institucionSchema= new Schema({
    nombre: String,
    direccion: String,
    celular : String,
    representante: String
});

interface iInstitucion extends Document{
    nombre: String,
    direccion: String,
    celular : String,
    representante: String
}

export default model<iInstitucion>('Institucion', institucionSchema)