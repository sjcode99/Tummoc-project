const { Router } = require('express');
const fileRouter = Router();
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'Files'); // for finding the current path of directory

// end point: /files/create ---> used to create particular number of files inside given directory/folder 
fileRouter.get('/create', (req, res) => {
    try {
        for (let i = 0; i < 10; i++) {
            fs.writeFileSync(`${dirname}/hello${i}.txt`, `This is Hello${i} contents`);
        }
        res.send({ msg: 'Files Creates Successfully' });
    } catch (err) {
        console.log(err);
    }
});

// end point: /files/readdir ---> used for count all files of given directory
fileRouter.get('/readdir', (req, res) => {
    fs.readdir(dirname, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({ msg: `Number of files inside Files Directory ${result.length}`, Files: result });
        }
    });
});

// end point: /files/processFiles --> used to Create an event loop concept with a file processing system;
fileRouter.get('/processFiles', (req, res) => {
    function processFiles() {
        // Get all files of the "Files" directory
        const files = fs.readdirSync(dirname);
        // Loop through each file
        files.forEach((file) => {
            // Read the file's contents
            const contents = fs.readFileSync(`${dirname}/${file}`, 'utf-8');
            const newContents = contents.toUpperCase();
            fs.writeFileSync(`${dirname}/${file}`, newContents);
        });
    };

    // after every 5 seconds cb will called;
    let id = setInterval(() => {
        processFiles();
    }, 5000);

    setTimeout(() => {
        if (id) {
            clearInterval(id);
            res.send({ msg: 'Files Processed Successfully' });
        }
    }, 6000);
});


module.exports = { fileRouter };