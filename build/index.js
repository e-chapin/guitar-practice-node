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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var db_1 = require("./db");
var cors_1 = __importDefault(require("cors"));
var path = __importStar(require("path"));
var practice_item_model_1 = require("./practice_item_model");
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
var PORT = process.env.PORT || 3001;
var REACT_BUILD_DIR = path.join(__dirname, 'public/react/react-gp');
app.use(express_1.default.static(REACT_BUILD_DIR));
var port = 3001;
var message = 'Hello world!';
app.listen(port, function () {
    console.log("App running on port " + port + ".");
});
app.get('/', function (req, res) {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'production') {
        res.status(200).send(message);
    }
    else {
        res.sendFile('index.html', { root: REACT_BUILD_DIR });
    }
});
app.get('/api/practice-item', function (req, response) {
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
    practice_item_model_1.createPracticeItem(req.body)
        .then(function (response) {
        res.status(200).send(response);
    })
        .catch(function (error) {
        res.status(500).send(error);
    });
});
app.delete('/api/practice-item', function (req, res) {
    practice_item_model_1.deletePracticeItem(req.body.id)
        .then(function (response) {
        res.status(200).send(response);
    })
        .catch(function (error) {
        res.status(500).send(error);
    });
});
app.post('/api/practice-item/complete', function (req, res) {
    practice_item_model_1.toggleComplete(req.body.id, req.body.is_completed)
        .then(function (response) {
        res.status(200).send(response);
    })
        .catch(function (error) {
        res.status(500).send(error);
    });
});
app.post('/api/practice-item/update', function (req, res) {
    practice_item_model_1.updatePracticeItem(req.body)
        .then(function (response) {
        res.status(200).send(response);
    })
        .catch(function (error) {
        res.status(500).send(error);
    });
});
