import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import bodyparser from 'body-parser';

import indexRoutes from './routes/index'

const app = express();

//setting
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

//routes
app.use('/api', indexRoutes)

// this folder for app will be used to store private files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;