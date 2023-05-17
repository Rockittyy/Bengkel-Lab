import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { __dirname, __filename, __parentdir } from './common.js'

// config
const port = 8080;
const __public = path.join(__parentdir, "public");


const app = express();


// use ejs basicly
app.set('view engine', 'ejs');
app.set('views', path.join(__parentdir, 'views')); //set the base ejs ussage as the views dir
app.use(express.static(__public)); // for serving public assets when requested



//* main start here
app.get('/', (req, res) => { res.render('index'); })
app.get('/debug', (req, res) => { res.render('debug'); })
app.get('/signin', (req, res) => {res.render('sign in')}) //!update later


// Start server
app.listen(port, () => { console.log(`Server has started on port ${port}`) });