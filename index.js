const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();

let app = express();

app.set("view engine", "hbs");

app.use(express.static("public"));

wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

app.use(express.urlencoded({
    extended: false
}));

(async function () {
    const landingRoutes = require('./routes/landing');
    app.use('/', landingRoutes);

    const posterRoutes = require('./routes/posters');
    app.use('/posters', posterRoutes);
})();

app.listen(3000, function () {
    console.log("Server started");
});