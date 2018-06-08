import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaymentPosComponent } from './payment-pos.component';
import { PaymentPosDetailComponent } from './payment-pos-detail.component';
import { PaymentPosPopupComponent } from './payment-pos-dialog.component';
import { PaymentPosDeletePopupComponent } from './payment-pos-delete-dialog.component';

export const paymentRoute: Routes = [
    {
        path: 'payment-pos',
        component: PaymentPosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'payment-pos/:id',
        component: PaymentPosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentPopupRoute: Routes = [
    {
        path: 'payment-pos-new',
        component: PaymentPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-pos/:id/edit',
        component: PaymentPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-pos/:id/delete',
        component: PaymentPosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
