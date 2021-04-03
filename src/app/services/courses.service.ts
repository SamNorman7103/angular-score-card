import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient
  ){}

  //Get Courses
  getCourses(){
    return this.http.get('https://golf-courses-api.herokuapp.com/courses/')
  }
  getCourseData(id: string){
    return this.http.get(`https://golf-courses-api.herokuapp.com/courses/${id}`);
  }
}
