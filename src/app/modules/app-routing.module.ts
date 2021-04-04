import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseSelectComponent } from '../components/course-select/course-select.component';
import { ScoreCardComponent } from '../components/score-card/score-card.component'
const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CourseSelectComponent},
  { path: 'play', component: ScoreCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
