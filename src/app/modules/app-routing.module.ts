import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreCardComponent } from '../components/score-card/score-card.component'
const routes: Routes = [
  { path: '',   redirectTo: 'play', pathMatch: 'full' },
  { path: 'play', component: ScoreCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
