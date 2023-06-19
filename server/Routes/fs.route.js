const { Router } = require('express');
const fileRouter = Router();
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'Files'); 

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

fileRouter.get('/readdir', (req, res) => {
    fs.readdir(dirname, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({ msg: `Number of files inside Files Directory ${result.length}`, Files: result });
        }
    });
});

fileRouter.get('/processFiles', (req, res) => {
    function processFiles() {
        const files = fs.readdirSync(dirname);
        files.forEach((file) => {
            const contents = fs.readFileSync(`${dirname}/${file}`, 'utf-8');
            const newContents = contents.toUpperCase();
            fs.writeFileSync(`${dirname}/${file}`, newContents);
        });
    };

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