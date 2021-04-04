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
  
  constructor(
    private CoursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.CoursesService.getCourses().subscribe((response: any) => {
      response.courses.forEach((course) => {
        this.CoursesService.getCourseData(course.id).subscribe(
          (response: any) => {
            if (response.data.id == this.route.snapshot.params['id']){
              console.log('course found')
              this.selectedCourse.push({
                id: response.data.id,
                name: response.data.name,
                image: response.data.thumbnail,
                holes: response.data.holes,
              })
              console.log(this.selectedCourse)
            }        
          }
        );
      });
    });
  }
  getOutHoles(){
    return this.selectedCourse[0].holes.filter(hole => hole.hole <= 9)
  }
  getInHoles(){
    return this.selectedCourse[0].holes.filter(hole => hole.hole > 9)
  }
  //next is to add a tee flag and then render the hcap accordingly
  setTee(number: string[]){

  }
}
