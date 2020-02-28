import { Request, Response } from 'express'
import Informe from '../models/informeAcademico';
const User = require('../libs/user');
import path from 'path'
import fs from 'fs-extra'
import Instituciones from '../models/Instituciones';

export async function getInformes(req: Request, res: Response): Promise<Response>{
    const informe = await Informe.find();
    return res.json(informe)
}

export async function getInforme(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const vinculacion = await Informe.findById(id);
    return res.json(vinculacion)
}

export async function crearInforme(req: Request, res: Response): Promise<Response> {
    const { nombreProyecto, idConvenio, idTutorAcademico, fecha, idEstudiante, estadoAprobacion, horas } = req.body;
    const newInforme = { 
        nombreProyecto,  
        fecha, 
        estadoAprobacion,
        horas,
        total: 0,
        archivoPath: req.file.path,
        idConvenio,
        idTutorAcademico, 
        idEstudiante 
    };
    const archivo = new Informe(newInforme);
    await archivo.save();
    const vinculacion = await Informe.find();
    return res.json({
        message: 'file Saved Successfully',
        vinculacion
    });
};

export async function updateInforme(req: Request, res: Response): Promise<Response>{
    const { nombreProyecto, idConvenio, idTutorAcademico, fecha, idEstudiante, estadoAprobacion, horas } = req.body;
    const informe = await Informe.findById(req.params.id);
    if(informe){
        await fs.unlink(path.resolve(informe.archivoPath))
    }
    await Informe.findByIdAndUpdate(req.params.id, { 
        nombreProyecto, 
        idConvenio,
        idTutorAcademico, 
        fecha, 
        idEstudiante,
        estadoAprobacion,
        horas,
        archivoPath: req.file.path 
    }, {new:true});
    const vinculacion = await Informe.find();
    return res.json({
        message: 'File Updated',
        vinculacion
    })
}

export async function updateEstado(req: Request, res: Response): Promise<Response>{
    const { estadoAprobacion } = req.body;
    await Informe.findByIdAndUpdate(req.params.id, { 
        estadoAprobacion
    }, {new:true});
    const vinculacion = await Informe.find();
    return res.json({
        message: 'Estado Updated',
        vinculacion
    })
}

export async function deleteInforme(req: Request, res: Response): Promise<Response>{
    const informe = await Informe.findByIdAndRemove(req.params.id);
    if(informe){
        await fs.unlink(path.resolve(informe.archivoPath))
    }
    const vinculacion = await Informe.find();
    return res.json({
        message: 'Delete finished',
        vinculacion
    })
}

export async function getInformeEstudiante(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const informes = await Informe.find().where('idEstudiante', id);
    return res.json(informes)
}

export async function getContarAprobados(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const informes = await Informe.aggregate(
        [
            {
              $group:
                {
                  _id: "$idEstudiante",
                  total: { $sum: { $multiply: [ "$horas" ] } },
                }
            }
          ]
    )
    return res.json(informes)
}

