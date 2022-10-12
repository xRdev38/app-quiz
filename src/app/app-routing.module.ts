import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/quiz',
    pathMatch: 'full',
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./features/quiz/quiz.module').then(module => module.QuizModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
