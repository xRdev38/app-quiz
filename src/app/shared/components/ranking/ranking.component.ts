import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingComponent extends BaseComponent {
  ranking$ = new BehaviorSubject<number | null>(null);

  @Input() set rank(rankingScore: number | null) {
    this.ranking$.next(rankingScore);
  }
}
