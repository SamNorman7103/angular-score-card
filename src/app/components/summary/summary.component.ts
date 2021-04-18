import { Component, OnInit, Input } from '@angular/core';
import { GameDataService } from 'src/app/services/game-data.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  gameData: any;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    this.gameData = [{},{}]
  }

  getGameData(){
    this.gameData = this.gameDataService.getGameData();
    console.log(this.gameData)
  }

}
