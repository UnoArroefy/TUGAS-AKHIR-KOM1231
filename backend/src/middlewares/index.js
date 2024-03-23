import express from 'express';
import cors from 'cors';
import routes from '../routes/index.js';
import { JSONerror, notFound } from '../controllers/error.controller.js';

const middleware = express();
middleware.use(cors());
middleware.use(express.json());
middleware.use(routes);
middleware.use(JSONerror);
middleware.use(notFound);

export default middleware;