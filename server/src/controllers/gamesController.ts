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
    public getOne(req: Request, res: Response) {
        res.json({ text: "this is game " + req.params.id });
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            await pool.query("INSERT INTO game set ?", req.body);
            res.json({ messsage: "Game saved" });
        } catch (error) {
            console.log(error);
        }
    }
    public delete(req: Request, res: Response) {
        res.json({ text: "Deleting a game: " + +req.params.id });
    }
    public update(req: Request, res: Response) {
        res.json({ text: "updating a game: " + req.params.id });
    }
}

const gamesController = new GamesController();
export default gamesController;
