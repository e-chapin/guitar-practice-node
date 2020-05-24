"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var practice_item_1 = require("../models/practice_item");
var db_1 = require("../db");
var REACT_BUILD_DIR = path.join(__dirname, 'public/react/react-gp');
console.log(REACT_BUILD_DIR);
module.exports = function (app) {
    app.get('/', function (req, res) {
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV !== 'production') {
            res.status(200).send('Running in dev mode, use React Server directly.');
        }
        else {
            res.sendFile('index.html', { root: REACT_BUILD_DIR });
        }
    });
    app.get('/api/practice-item', function (req, response) {
        // todo: move this to model
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
        practice_item_1.createPracticeItem(req.body)
            .then(function (response) {
            res.status(200).send(response);
        })
            .catch(function (error) {
            res.status(500).send(error);
        });
    });
    app.delete('/api/practice-item', function (req, res) {
        practice_item_1.deletePracticeItem(req.body.id)
            .then(function (response) {
            res.status(200).send(response);
        })
            .catch(function (error) {
            res.status(500).send(error);
        });
    });
    app.post('/api/practice-item/complete', function (req, res) {
        practice_item_1.toggleComplete(req.body.id, req.body.is_completed)
            .then(function (response) {
            res.status(200).send(response);
        })
            .catch(function (error) {
            res.status(500).send(error);
        });
    });
    app.post('/api/practice-item/update', function (req, res) {
        practice_item_1.updatePracticeItem(req.body)
            .then(function (response) {
            res.status(200).send(response);
        })
            .catch(function (error) {
            res.status(500).send(error);
        });
    });
};
