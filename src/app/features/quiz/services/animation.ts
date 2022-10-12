import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SlideLeftToRightAnimation = {
  slideLeftToRight: trigger('slideLeftToRight', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('500ms ease-in', style({ transform: 'translateX(0%)' })),
    ]),
  ]),
};

export const ChangeRouteAnimation = {
  changeRoute: trigger('changeRoute', [
    transition('* => animationStarted', [
      animate(
        '1s',
        keyframes([
          style({ transform: 'scale(1.0)' }),
          style({ transform: 'scale(1.3)' }),
          style({ transform: 'scale(1.0)' }),
        ])
      ),
    ]),
  ]),
};
