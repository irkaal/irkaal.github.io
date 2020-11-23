import { trigger, style, animate, transition, query, group, keyframes } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            style({ opacity: 0 }),
            animate('1.5s ease', style({ opacity: 1 }))
        ])
    ]);
