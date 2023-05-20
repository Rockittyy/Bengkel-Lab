import fs, { read } from 'fs'
import express from 'express';
import { JSDOM } from 'jsdom';
import ejs from 'ejs';
import path, { resolve } from 'path';
import { __dirname, __filename, __parentdir } from './common.js'
import { rejects } from 'assert';

//* config
const port = 8080;
const __public = path.join(__parentdir, "public");


const app = express();


//* use ejs basicly
app.set('view engine', 'ejs');
app.set('views', path.join(__parentdir, 'views')); //set the base ejs ussage as the views dir
app.use(express.static(__public)); // for serving public assets when requested

const __views = path.join(__parentdir, 'views');
const __partials = path.join(__views, 'partials');

//* Utilitys
const render = (res: express.Response, file: string, extra?: object) => res.render(file, { ...extra, ...ejsOb });
// Used to read file asyncly with promise
async function readFile(...paths: Array<string>): Promise<string> {
    return new Promise((resolve, rejects) => {
        fs.readFile(path.join(...paths), 'utf8', (err, data) => {
            if (err) rejects(err);
            resolve(data);
        });
    })
}
// load html from path, return Document from dom 
//TODO: You can make a chache for this
async function loadHtml(...paths: Array<string>): Promise<Document> {
    return new Promise((resolve, rejects) => {
        readFile(...paths).then((rawHtml) => {
            resolve(new JSDOM(rawHtml).window.document);
        }).catch((err) => rejects(err));
    })
}

const serialize = (doc: Document): string => doc.documentElement.outerHTML;
async function sLoadHtml(...paths: Array<string>) {
    return serialize(await loadHtml(...paths));
}
// default objects property, for transfering code to ejs
//? kinda work like a chache after a think about this
const ejsOb = {
    partials:{
        logoBl:await sLoadHtml(__partials,'logoBL.ejs'),
    }
}

//* main start here
app.get('/', (req, res) => { render(res, "index") });
app.get('/debug', (req, res) => { render(res, "debug") });
app.get('/signin', (req, res) => { render(res, "sign in") }); //!update later


// Start server
app.listen(port, () => { console.log(`Server has started on port ${port}`) });