let express = require('express');
let app = express();

app.listen(8000);
app.get("/", (req, res, next) => {
    res.send({status: "PDF Printer"});
})


app.use(require("./printbill"));