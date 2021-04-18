import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private db: AngularFirestore) {}

  gameData: any;

  getGameData() {
    return this.gameData;
  }

  setGameData(x: any){
    this.gameData = x;
  }

  saveGame(data: any): any {
    this.db.collection('save-data').add(data);
}
}
