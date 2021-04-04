import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
})
export class ScoreCardComponent implements OnInit {
  selectedCourse: any[] = [];
  tee: number; //0 pro 1 Champion 2 Men 3 Women

  constructor(
    private CoursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tee = 0;

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
  getOutHoles() {
    return this.selectedCourse[0].holes.filter((hole) => hole.hole <= 9);
  }
  getInHoles() {
    return this.selectedCourse[0].holes.filter((hole) => hole.hole > 9);
  }
  getOutHcap() {
    let hcap = [];
    this.selectedCourse[0].holes.forEach((hole) => {
      if (hole.hole <= 9) {
        hcap.push(hole.teeBoxes[this.tee]);
      }
    });
    console.log(hcap);
    return hcap;
  }
  getInHcap() {
    let hcap = [];
    this.selectedCourse[0].holes.forEach((hole) => {
      if (hole.hole > 9) {
        hcap.push(hole.teeBoxes[this.tee]);
      }
    });
    console.log(hcap);
    return hcap;
  }

  setTee(tee: number) {
    this.tee = tee;
  }
}
