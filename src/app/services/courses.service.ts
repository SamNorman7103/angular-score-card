import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course'
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  courses: Course[] = [
    { 
      id: '18300',
      name: 'Fox Hollow',  
      image: 'https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/12486769/uploaded-photo43828077-480x360.png'
    },
    {
      id: '11819', 
      name: 'Thanksgiving Point', 
      image: 'https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/10112953/uploaded-photo68921726-480x270.png'
    },
    {
      id: '19002',
      name: 'Spanish Oaks',  
      image: 'https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/12399619/uploaded-photo58903008-480x360.png'
    }
  ]
  
}
