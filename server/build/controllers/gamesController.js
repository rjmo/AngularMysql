"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield database_1.default.query("SELECT * FROM game");
                res.json(games);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const game = yield database_1.default.query("SELECT * FROM game WHERE id = ?", [id]);
                console.log(game);
                if (game.length > 0) {
                    return res.json(game[0]);
                }
                res.status(404).json({ text: "Page not found" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO game set ?", req.body);
                res.json({ message: "Game saved" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query("DELETE FROM game WHERE id = ?", [id]);
                res.json({ message: "Game deleted" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query("UPDATE game set ? WHERE id = ?", [req.body, id]);
                res.json({ text: "updating a game" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
