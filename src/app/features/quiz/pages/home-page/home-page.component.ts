import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '../../../../shared';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent extends BaseComponent {
  constructor() {
    super();
  }
}
