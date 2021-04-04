import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.scss']
})
export class CourseSelectComponent implements OnInit {
  courses: any[] = [];
  
  constructor(
    private CoursesService: CoursesService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.CoursesService.getCourses()
    .subscribe((response: any) => {
      response.courses.forEach(course => {
        this.CoursesService.getCourseData(course.id)
          .subscribe((response: any) => {
            this.courses.push({id: response.data.id, name: response.data.name, image: response.data.thumbnail})
          })
      })
    })
  }

  loadSelectedCourse(courseID: string): void {
    this.router.navigate(['./play', {id: courseID}]);
}
  

}
