import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BillPosComponent } from './bill-pos.component';
import { BillPosDetailComponent } from './bill-pos-detail.component';
import { BillPosPopupComponent } from './bill-pos-dialog.component';
import { BillPosDeletePopupComponent } from './bill-pos-delete-dialog.component';

export const billRoute: Routes = [
    {
        path: 'bill-pos',
        component: BillPosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bill-pos/:id',
        component: BillPosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billPopupRoute: Routes = [
    {
        path: 'bill-pos-new',
        component: BillPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-pos/:id/edit',
        component: BillPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-pos/:id/delete',
        component: BillPosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
