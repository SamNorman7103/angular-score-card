import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../interfaces/player';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

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
  totalPar: number;
  totalYards: number;
  totalHcap: number;
  playerNameFC = new FormControl('', this.nameValidator());

  constructor(
    private CoursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tee = 2;
    this.isComplete = false;
    this.totalPar = 0;
    this.totalYards = 0;
    this.totalHcap = 0;

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

  setTee(tee: number) {
    this.tee = tee;
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
}
