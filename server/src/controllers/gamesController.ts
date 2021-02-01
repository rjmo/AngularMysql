import { Request, Response } from "express";
import pool from "../database";

class GamesController {
    public async list(req: Request, res: Response) {
        try {
            const games = await pool.query("SELECT * FROM game");
            res.json(games);
        } catch (error) {
            console.log(error);
        }
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const game = await pool.query("SELECT * FROM game WHERE id = ?", [id]);
            console.log(game);
            if (game.length > 0) {
                return res.json(game[0]);
            }
            res.status(404).json({ text: "Page not found" });
        } catch (error) {
            console.log(error);
        }
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            await pool.query("INSERT INTO game set ?", req.body);
            res.json({ message: "Game saved" });
        } catch (error) {
            console.log(error);
        }
    }
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM game WHERE id = ?", [id]);
            res.json({ message: "Game deleted" });
        } catch (error) {
            console.log(error);
        }
    }
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query("UPDATE game set ? WHERE id = ?", [req.body, id]);
            res.json({ text: "updating a game" });
        } catch (error) { 
            console.log(error);
        }
    }
}

const gamesController = new GamesController();
export default gamesController;
