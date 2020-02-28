import { Router } from 'express';
import { getInformes, crearInforme, getInforme, deleteInforme, updateInforme, getInformeEstudiante, updateEstado, getContarAprobados } from '../controllers/informeControllers'
import multer from '../libs/multer'
import { loginUser, createUser } from '../controllers/loginControllers';
import { crearInstitucion, getInstitucion, getInstituciones, updateInstitucion, deleteInstitucion } from '../controllers/institucionControllers';
import { getEstudiante, updateEstudiantes, getNoVinculados, getVinculo, getVinculados, getEstudiant } from '../controllers/userController';
const router = Router();

router.route('/registro')
  .post(createUser);

router.route('/login')
  .post(loginUser);

router.route('/getEstudianteInforme/:id')
  .get(getInformeEstudiante)
  .put(updateEstudiantes)
  
router.route('/estudiantes')
  .get(getEstudiante)

router.route('/estudiantes/:id')
.get(getEstudiant)

router.route('/vinculados/:id')
  .get(getVinculo)

  router.route('/vinculados')
  .get(getVinculados)

router.route('/noVinculados')
  .get(getNoVinculados)

router.route('/obtenerConvenios')
  .post(crearInstitucion)
  .get(getInstituciones);

router.route('/convenio/:id')
  .put(updateInstitucion)
  .delete(deleteInstitucion)
  .get(getInstitucion);

router.route('/obtenerDatos')
  .post(multer.single('file'), crearInforme)
  .get(getInformes)

router.route('/getInforme/:id')
  .get(getInforme)
  .delete(deleteInforme)
  .put(multer.single('file'), updateInforme)

router.route('/updateEstado/:id')
  .put(updateEstado);

router.route('/calcular')
  .get(getContarAprobados);


export default router;