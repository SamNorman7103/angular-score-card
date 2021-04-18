import { Component, OnInit, Input } from '@angular/core';
import { GameDataService } from 'src/app/services/game-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  scores: any[] = []
  gameData: any;
  visible: boolean;

  constructor(private gameDataService: GameDataService, private router: Router) { }

  ngOnInit(): void {
    this.gameData = [{},{}]
    this.visible = false;
  }

  getGameData(){
    if (this.gameData === this.gameDataService.getGameData()){
      this.gameData = this.gameDataService.getGameData();
    }
    else {
      this.gameData = this.gameDataService.getGameData();
      if (this.gameData !== undefined){
        console.log('iterating through players')
        this.gameData.playerData.forEach(p => {

          console.log(p)
          let score = 0;
          let standing = "";
          for(let i = 0; i < p.data.out.length; i++){
            score += p.data.out[i].score
          }
          for(let i = 0; i < p.data.in.length; i++){
            score += p.data.in[i].score
          }
          if (score < this.gameData.par){
            standing = "Below Par. Awesome!"
          }
          if(score > this.gameData.par){
            standing = "Over par. Better luck next time"
          }
          if (score == this.gameData.par){
            standing = "On par!"
          }
          this.scores.push({name: p.name, score: score, standing: standing})
        })
        console.log(this.scores)
        this.visible = true;
      }
    }
  }

  save(): void {
    this.gameDataService.saveGame(this.gameData);
    this.router.navigate(['./home']);
}

}
