import path from 'path';
import express  from "express";
import dotenv from 'dotenv';
import cors from 'cors';

//load env variables
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost']
}));


//setup the view engine
app.set('view engine', 'hbs')

//expose a public directory to allow access to basic html pages
app.use(express.static(path.join(__dirname, '../public')))

//configure the directories for partials and view templates
const partialsDir = path.join(__dirname, '../templates/partials')
const viewsDir = path.join(__dirname, '../templates/views')
app.set('views', viewsDir)

export default app;
// module.exports = app