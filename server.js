'use strict';
// Based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

// Imports
const express = require('express'); // REST API
const carbone = require('carbone'); // CarboneJS
const fs = require('fs'); // File system
const multer  = require('multer'); // Possibility to retrieve files from multi-part request
const upload = multer({
    dest: 'templates/',
    limits: {fieldSize: 1024 * 1024 * 1024}
});

// Constants
const PORT = 8083;
const HOST = '0.0.0.0';

// App
const app = express();

const requestComponents = upload.fields([
    { name: 'template', maxCount: 1 },
    { name: 'content', maxCount: 1 },
    { name: 'outputFormat', maxCount: 1 },
    { name: 'formatOptions', maxCount: 1 },
    { name: 'fileName', maxCount: 1 }]);

app.get('/', (req, res) => {
    res.send('Welcome to carbone API, use /parseFile with POST request in order to get data');
});

app.post('/parseFile', requestComponents, function (req, res, next) {
    const _template = req.files['template'][0];
    const _content = JSON.parse(req.body['content']);
    const _outputFormat = req.body['outputFormat'];
    let _formatOptions = req.body['formatOptions'];
    const _fileName = req.body['fileName'];


console.log(_formatOptions);

    if(_formatOptions) {
        _formatOptions = JSON.parse(_formatOptions);
    }

    console.log("Received a new transformation Request for fileName=" + _fileName);
    const _options = {
        convertTo: {
		formatName: _outputFormat,
        	formatOptions : _formatOptions
	},
        reportName: _fileName,
        lang: "fr",
        timezone: "Europe/Paris"
    };

    console.log("Options = ", _options);
    carbone.render(_template.path, _content, _options, (err, result, reportName) => {
        if (err) {
            res.status(400);
            res.send(err.message);
            console.log("    " + err.message);
            console.log(err);
        } else {
            fs.writeFileSync('./build/' + reportName, result);
            res.setHeader('Content-disposition', 'attachment; filename=' + reportName);
            res.setHeader('Content-type', 'application/pdf');
            res.sendFile('/app/build/' + reportName);
            console.log("    report send to the client");
        }
    });
});

app.listen(PORT, HOST);
console.log(`Running on domain: http://${HOST}:${PORT}`);
