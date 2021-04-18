import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor() {}

  gameData: any;

  getGameData() {
    return this.gameData;
  }

  setGameData(x: any){
    this.gameData = x;
  }
}
