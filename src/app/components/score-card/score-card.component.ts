import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
})
export class ScoreCardComponent implements OnInit {
  selectedCourse: any[] = [];
  tee: number; //0 pro 1 Champion 2 Men 3 Women
  players: Player[] = [];

  constructor(
    private CoursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tee = 2;
    this.addPlayer()

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

  addPlayer(){
    if (this.players.length < 4){
      this.players.push(
        {
         id: "player" + Number(this.players.length+1),
         name: "",
         score: 0
        }
      )
    }
  }
  
}
