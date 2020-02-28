import { Request, Response } from 'express'
const User = require('../libs/user');

export async function getEstudiante(req: Request, res: Response): Promise<Response> {
    const estudiantes = await User.find();
    return res.json(estudiantes)
}

export async function getEstudiant(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const estudiant = await User.findById(id);
    return res.json(estudiant)
}

export async function updateEstudiantes(req: Request, res: Response): Promise<Response> {
    const { idInstitucion }  = req.body;
    const estudiante= await User.findByIdAndUpdate(req.params.id, { 
        idInstitucion
    }, {new:true});
    return res.json({
        message: 'File Updated',
        estudiante
    })
}

export async function getVinculo(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const estudiantes = await User.find().where('idInstitucion', id);
    return res.json(estudiantes)
}

export async function getVinculados(req: Request, res: Response): Promise<Response>{
    const estudiantes = await User.find({ idInstitucion: { $ne: '0' } })
    return res.json(estudiantes)
}

export async function getNoVinculados(req: Request, res: Response): Promise<Response>{
    const estudiantes = await User.find().where('idInstitucion', '0');
    return res.json(estudiantes)
}

