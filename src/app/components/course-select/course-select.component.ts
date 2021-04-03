import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service'


@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.scss']
})
export class CourseSelectComponent implements OnInit {
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
            this.courses.push({id: response.data.id, name: response.data.name, image: response.data.thumbnail})
            console.log(this.courses)
          })
      })
    })
  }

}
