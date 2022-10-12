import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService, QuizFacadeService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { QuizRoutingEnum } from './quiz-routing.enum';
import { SharedModule } from '../../shared';
import { ApiService } from '@core/services';
import {
  HomePageComponent,
  QuizPageComponent,
  ResultsPageComponent,
} from './pages';
import { HomeComponent, FormComponent } from './components';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  HomeContainerComponent,
  FormContainerComponent,
  ResultsContainerComponent,
} from './containers';
import { CoreModule } from '@core/core.module';

const routes: Routes = [
  {
    path: QuizRoutingEnum.Home,
    component: HomePageComponent,
  },
  {
    path: QuizRoutingEnum.Question,
    component: QuizPageComponent,
  },
  {
    path: QuizRoutingEnum.Results,
    component: ResultsPageComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    FormComponent,
    QuizPageComponent,
    ResultsPageComponent,
    HomeContainerComponent,
    FormContainerComponent,
    ResultsContainerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CoreModule,
  ],
  providers: [ApiService, QuizService, QuizFacadeService],
})
export class QuizModule {}
