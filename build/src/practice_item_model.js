"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPracticeItem = void 0;
var db_1 = require("./db");
exports.createPracticeItem = function (body) {
    return new Promise(function (resolve, reject) {
        var text = body.text, description = body.description, url = body.url, is_completed = body.is_completed;
        db_1.pool.query('INSERT INTO practice_item (text, description, url, is_completed) VALUES ($1, $2, $3, $4) RETURNING *', [text, description, url, is_completed], function (error, results) {
            if (error) {
                reject(error);
            }
            resolve("A new Practice Item has been added added: " + results.rows[0]);
        });
    });
};
//# sourceMappingURL=../../src/build/src/practice_item_model.js.map