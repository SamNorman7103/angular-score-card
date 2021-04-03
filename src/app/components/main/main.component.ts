import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service'

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'image']
  courses: any[] = [];

  constructor(
    private CoursesService: CoursesService,
  ) { 
    
  }

  ngOnInit(): void {
    this.CoursesService.getCourses()
    .subscribe((response: any) => {
      response.courses.forEach(course => {
        this.CoursesService.getCourseData(course.id)
          .subscribe((response: any) => {
            this.courses.push(response)
            console.log(this.courses)
          })
      })
    })
  }

}
