"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePracticeItem = exports.toggleComplete = exports.deletePracticeItem = exports.createPracticeItem = void 0;
var db_1 = require("./db");
exports.createPracticeItem = function (body) {
    return new Promise(function (resolve, reject) {
        var _a = body.item, text = _a.text, description = _a.description, url = _a.url, is_completed = _a.is_completed;
        db_1.pool.query('INSERT INTO practice_item (text, description, url, is_completed) VALUES ($1, $2, $3, $4) RETURNING *', [text, description, url, is_completed], function (error, results) {
            if (error) {
                reject(error);
            }
            resolve("A new Practice Item has been added added: " + results.rows[0]);
        });
    });
};
exports.deletePracticeItem = function (id) {
    return new Promise(function (resolve, reject) {
        db_1.pool.query('DELETE FROM practice_item WHERE id = $1', [id], function (error, rseults) {
            if (error) {
                reject(error);
            }
            resolve('Practice Item Deleted');
        });
    });
};
exports.toggleComplete = function (id, value) {
    return new Promise(function (resolve, reject) {
        db_1.pool.query('UPDATE practice_item SET is_completed=$1 WHERE id=$2', [value, id], function (error, rseults) {
            if (error) {
                reject(error);
            }
            resolve('Practice Item Updated');
        });
    });
};
exports.updatePracticeItem = function (body) {
    return new Promise(function (resolve, reject) {
        var _a = body.item, id = _a.id, text = _a.text, description = _a.description, url = _a.url, is_completed = _a.is_completed;
        db_1.pool.query('UPDATE practice_item SET text=$1, description=$2, url=$3, is_completed=$4 WHERE id=$5', [text, description, url, is_completed, id], function (error, results) {
            if (error) {
                reject(error);
            }
            resolve("Practice Item has been added update: " + results.rows[0]);
        });
    });
};
//# sourceMappingURL=practice_item_model.js.map