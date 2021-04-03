import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service'
import { Course } from 'src/app/interfaces/course'
@Component({
  selector: 'course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.scss']
})
export class CourseSelectComponent implements OnInit {
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
