import express from 'express';
import serviceRoutes from './route/service-route';
import cors from 'cors';

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route prefix
app.use('/', serviceRoutes);

module.exports = app;
