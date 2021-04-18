import { Component, OnInit} from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../interfaces/player';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
})
export class ScoreCardComponent implements OnInit {
  selectedCourse: any[] = [];
  tee: number; //0 pro 1 Champion 2 Men 3 Women
  players: Player[] = [];
  isComplete: boolean;
  outPar: number;
  outYards: number;
  outHcap: number;
  inPar: number;
  inYards: number;
  inHcap: number;
  tees: any[] = [];
  

  playerNameFC = new FormControl('', this.nameValidator());

  constructor(
    private CoursesService: CoursesService,
    private route: ActivatedRoute,
    private gameDataService: GameDataService
  ) {}

  ngOnInit(): void {
    this.tee = 2;
    this.isComplete = false;
    this.outHcap = 0;
    this.outPar = 0;
    this.outYards = 0;
    this.inHcap = 0;
    this.inPar = 0;
    this.inYards = 0;
    
    this.CoursesService.getCourses().subscribe((response: any) => {
      response.courses.forEach((course) => {
        this.CoursesService.getCourseData(course.id).subscribe(
          (response: any) => {
            if (response.data.id == this.route.snapshot.params['id']) {
              console.log('course found');
              this.selectedCourse.push({
                id: response.data.id,
                name: response.data.name,
                image: response.data.thumbnail,
                holes: response.data.holes,
              });
              console.log(this.selectedCourse);
              this.calculateTotalCourseValues();
              this.populateTees();
            }
          }
        );
      });
    });

  }

  getOutPar() {
    let par = [];
    this.selectedCourse[0].holes.forEach((hole) => {
      if (hole.hole <= 9) {
        par.push(hole.teeBoxes[this.tee]);
      }
    });
    return par;
  }

  getInPar() {
    let par = [];
    this.selectedCourse[0].holes.forEach((hole) => {
      if (hole.hole > 9) {
        par.push(hole.teeBoxes[this.tee]);
      }
    });
    return par;
  }

  getOutYards() {
    let yards = [];
    this.selectedCourse[0].holes.forEach((hole) => {
      if (hole.hole <= 9) {
        yards.push(hole.teeBoxes[this.tee]);
      }
    });
    return yards;
  }

  getInYards() {
    let yards = [];
    this.selectedCourse[0].holes.forEach((hole) => {
      if (hole.hole > 9) {
        yards.push(hole.teeBoxes[this.tee]);
      }
    });
    return yards;
  }

  getOutHcap() {
    let hcap = [];
    this.selectedCourse[0].holes.forEach((hole) => {
      if (hole.hole <= 9) {
        hcap.push(hole.teeBoxes[this.tee]);
      }
    });
    return hcap;
  }

  getInHcap() {
    let hcap = [];
    this.selectedCourse[0].holes.forEach((hole) => {
      if (hole.hole > 9) {
        hcap.push(hole.teeBoxes[this.tee]);
      }
    });
    return hcap;
  }

  setTee(tee: string) {
    let index = this.tees.findIndex(t => t.tee === tee);
    this.tee = index;
    this.calculateTotalCourseValues();
  }

  addPlayer(): void {
    if (this.players.length < 4) {
      if (this.playerNameFC.value) {
        this.players.push({
          id: 'player' + Number(this.players.length + 1),
          name: this.playerNameFC.value,
          data: {
            out: [
              { hole: `player${this.players.length + 1}h1`, score: 0 },
              { hole: `player${this.players.length + 1}h2`, score: 0 },
              { hole: `player${this.players.length + 1}h3`, score: 0 },
              { hole: `player${this.players.length + 1}h4`, score: 0 },
              { hole: `player${this.players.length + 1}h5`, score: 0 },
              { hole: `player${this.players.length + 1}h6`, score: 0 },
              { hole: `player${this.players.length + 1}h7`, score: 0 },
              { hole: `player${this.players.length + 1}h8`, score: 0 },
              { hole: `player${this.players.length + 1}h9`, score: 0 },
            ],
            in: [
              { hole: `player${this.players.length + 1}h10`, score: 0 },
              { hole: `player${this.players.length + 1}h11`, score: 0 },
              { hole: `player${this.players.length + 1}h12`, score: 0 },
              { hole: `player${this.players.length + 1}h13`, score: 0 },
              { hole: `player${this.players.length + 1}h14`, score: 0 },
              { hole: `player${this.players.length + 1}h15`, score: 0 },
              { hole: `player${this.players.length + 1}h16`, score: 0 },
              { hole: `player${this.players.length + 1}h17`, score: 0 },
              { hole: `player${this.players.length + 1}h18`, score: 0 },
            ],
          },
        });
        this.playerNameFC.setValue('');
      }
    }
  }

  isNumber(event) {
    if (!Number(event.key)) {
      return false;
    }
  }

  updateScore(event) {
    if (Number(event.key)) {
      let hole = Number(event.target.id.substr(8) - 1);
      let player = event.target.parentNode.parentNode.id;
      let score = Number(event.target.value);
      console.log(hole);
      let targetPlayer = this.players.find((p) => p.id === player);
      console.log(targetPlayer);
      if (hole <= 8) {
        targetPlayer.data.out[hole].score = score;
      }
      if (hole >= 9) {
        targetPlayer.data.in[hole - 9].score = score;
      }
    }

    if (this.isGameComplete()) {
      this.isComplete = true;
    }
  }

  isGameComplete() {
    let completeCount = 0;
    let complete = false;

    this.players.forEach((p) => {
      let outContainsZero = p.data.out.some((hole) => hole.score === 0);
      let inContainsZero = p.data.in.some((hole) => hole.score === 0);

      if (outContainsZero === false && inContainsZero === false) {
        completeCount += 1;
      }
    });

    if (completeCount === this.players.length) {
      complete = true;
      this.gameDataService.setGameData({playerData: this.players, par: this.inPar + this.outPar})
      console.log('TRIGGER');
    }
    return complete;
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.players && this.players.length) {
        this.players.forEach((player) => {
          if (player.name.toLowerCase() === control.value.toLowerCase()) {
            error = { duplicate: true };
          }
        });
      }
      return error;
    };
  }

  calculateTotalCourseValues(){
      let inPar = 0;
      let inYards = 0;
      let inHcap = 0;
      let outPar = 0;
      let outYards = 0;
      let outHcap = 0;

      let course = this.selectedCourse[0];
      for (let i = 0; i < course.holes.length; i++){
        if (i <= 9){
          outPar += course.holes[i].teeBoxes[this.tee].par;
          outYards += course.holes[i].teeBoxes[this.tee].yards;
          outHcap += course.holes[i].teeBoxes[this.tee].hcp;
        }
        else if (i >= 10){
          inPar += course.holes[i].teeBoxes[this.tee].par;
          inYards += course.holes[i].teeBoxes[this.tee].yards;
          inHcap += course.holes[i].teeBoxes[this.tee].hcp;
        }
      }
      this.inPar = inPar;
      this.inYards = inYards;
      this.inHcap = inHcap;
      this.outPar = outPar;
      this.outYards = outYards;
      this.outHcap = outHcap;
  }

  populateTees(){
    this.selectedCourse[0].holes[0].teeBoxes.forEach(tee => {
      if (tee.teeType == "pro"){
        this.tees.push({tee: tee.teeType, value: 0})
      } //0 pro 1 Champion 2 Men 3 Women
      if (tee.teeType == "champion"){
        this.tees.push({tee: tee.teeType, value: 1})
      }
      if (tee.teeType == "men"){
        this.tees.push({tee: tee.teeType, value: 2})
      }
      if (tee.teeType == "women"){
        this.tees.push({tee: tee.teeType, value: 3})
      }
      console.log(this.tees)
    })
  }
}
