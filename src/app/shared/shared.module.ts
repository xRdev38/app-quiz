import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaseComponent,
  RankingComponent,
  ResultsComponent,
  QuestionComponent,
  SingleAnswerComponent,
  MultipleAnswerComponent,
  TextAnswerComponent,
  TimerComponent,
} from './components';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimerService } from './services';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  declarations: [
    BaseComponent,
    BaseComponent,
    RankingComponent,
    ResultsComponent,
    QuestionComponent,
    SingleAnswerComponent,
    MultipleAnswerComponent,
    TextAnswerComponent,
    TimerComponent,
  ],
  exports: [
    BaseComponent,
    RankingComponent,
    ResultsComponent,
    QuestionComponent,
    SingleAnswerComponent,
    MultipleAnswerComponent,
    TextAnswerComponent,
    TimerComponent,
  ],
  providers: [TimerService],
})
export class SharedModule {}
