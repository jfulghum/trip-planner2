const express = require("express")

const path = require("path")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const db = require("./models").db;
const app = express()
const routes = require("./routes");

app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use("/api", routes);

// Any routes or other various middlewares should go here!
// base of your app where requests are processed. send this right away!
app.use(function(req, res, next){
    var err = new Error('Not found')
    err.status = 404;
    next(err)
})

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    console.error(err)
    res.send("Something went wrong: " + err.message)
})

const port = 3000;
app.listen(port, function(){
    console.log(`the server is listening on ${port}`)
    db
    .sync()
    .then(function(){
        console.log('Synced the db')
    })
    .catch(function(err) {
        console.error("Trouble right here in River City", err, err.stack)
    });
})