let express = require('express');
let router = express.Router();

//Required package
let pdf = require("pdf-creator-node");
let fs = require("fs");

// Read HTML Template
let html = fs.readFileSync("template.html", "utf8");
let users = [
    {
        name: "ภาษาไทย", age: "26",
    },
    {
        name: "Navjot", age: "26",
    },
    {
        name: "Vitthal", age: "26",
    },
];

//"format": "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
let options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

router.get("/pdf", (req, res) => {
    let document = {
        html: html,
        data: {
            users: users,
        },
        path: "./bills/" + Date.now() + ".pdf",
        type: "",
    };

    const myPromise = new Promise((resolve, reject) => {
        pdf.create(document, options)
            .then((res) => {
                resolve(res);
                console.log(res);
            })
            .catch((error) => {
                reject(error);
                console.error(error);
            });
    });

    myPromise.then(value => {
        // res.send(value);
        res.sendFile(value.filename);
    }).catch(err => {
        res.send(err);
    });
})

module.exports = router;