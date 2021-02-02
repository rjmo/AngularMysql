import { Game } from './../models/Game';
import { Component, HostBinding, OnInit } from '@angular/core';

import { GamesService } from "../services/games.service";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class')classes = 'row';
  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  }

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
  }
  saveNewGame() {
    delete this.game.id;
    delete this.game.created_at;
    this.gameService.saveGame(this.game).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }
}
