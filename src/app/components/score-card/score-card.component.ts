import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service'

@Component({
  selector: 'score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {
  courses: any[] = [];
  constructor(
    private CoursesService: CoursesService, 
    ) { }

  ngOnInit(): void {
    this.CoursesService.getCourses()
    .subscribe((response: any) => {
      response.courses.forEach(course => {
        this.CoursesService.getCourseData(course.id)
          .subscribe((response: any) => {
            this.courses.push({id: response.data.id, name: response.data.name, image: response.data.thumbnail, holes: response.data.holes})
            console.log(this.courses)
          })
      })
    })
  }

}
