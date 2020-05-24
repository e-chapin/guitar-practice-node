"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("./db");
var cors_1 = __importDefault(require("cors"));
var practice_item_model_1 = require("./practice_item_model");
var app = express_1.default();
app.use(cors_1.default());
var port = 3001;
var message = 'Hello world!';
app.get('/', function (req, res) {
    res.status(200).send(message);
});
app.get('/api/practice-item/all', function (req, response) {
    db_1.pool.query('SELECT * FROM practice_item ORDER BY id ASC', function (err, res) {
        if (err) {
            response.status(500).send(err);
        }
        else {
            response.status(200).send(res.rows);
        }
    });
});
app.post('/api/practice-item', function (req, res) {
    console.log('creating practice item');
    console.log(req);
    console.log(res);
    practice_item_model_1.createPracticeItem(req.body)
        .then(function (response) {
        res.status(200).send(response);
    })
        .catch(function (error) {
        res.status(500).send(error);
    });
});
app.listen(port, function () {
    console.log("App running on port " + port + ".");
});
//# sourceMappingURL=../../src/build/src/index.js.map