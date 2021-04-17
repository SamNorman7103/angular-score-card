import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient
  ){}

  //Get Courses
  getCourses(): Observable<any>{
    return this.http.get('https://golf-courses-api.herokuapp.com/courses/')
  }
  getCourseData(id: string): Observable<any>{
    return this.http.get(`https://golf-courses-api.herokuapp.com/courses/${id}`);
  }
}
