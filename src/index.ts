import fs, { read } from 'fs'
import express from 'express';
import { JSDOM } from 'jsdom';
import ejs from 'ejs';
import path, { resolve } from 'path';
import { __dirname, __filename, __parentdir } from './common.js'
import { rejects } from 'assert';
import chalk from 'chalk';
import { error } from 'console';

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
async function loadElement(...paths: Array<string>): Promise<HTMLElement> {
    return new Promise((resolve, rejects) => {
        readFile(...paths).then((rawHtml) => {
            const element = new JSDOM(rawHtml).window.document.documentElement.lastElementChild?.firstElementChild as HTMLElement;
            element ? resolve(element) : rejects("empty document")
        }).catch((err) => rejects(err));
    })
}
const serialize = (el: Element): string => el.outerHTML;
async function sLoadHtml(...paths: Array<string>) {
    return serialize(await loadElement(...paths));
}
// default objects property, for transfering code to ejs
//? kinda work like a chache after a think about this
const ejsOb = {

}

//* main start here
app.get('/', (req, res) => { render(res, "index") });
app.get('/debug', (req, res) => { render(res, "debug") });
app.get('/signin', (req, res) => { render(res, "sign in") }); //!update later


// Start server
app.listen(port, () => { console.log(`Server has started on port ${port}`) });