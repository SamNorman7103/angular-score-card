import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Courses } from 'src/app/interfaces/courses';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
})
export class ScoreCardComponent implements OnInit {
  selectedCourse: any[] = [];
  displayedColumns: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
  ];

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
}
