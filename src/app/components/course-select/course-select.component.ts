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
  courses: Course[];

  constructor(
    private CoursesService: CoursesService,
  ) { 
    
  }

  ngOnInit(): void {
    this.courses = this.CoursesService.courses
  }

}
