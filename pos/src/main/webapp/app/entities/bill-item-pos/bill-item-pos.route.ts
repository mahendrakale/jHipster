import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BillItemPosComponent } from './bill-item-pos.component';
import { BillItemPosDetailComponent } from './bill-item-pos-detail.component';
import { BillItemPosPopupComponent } from './bill-item-pos-dialog.component';
import { BillItemPosDeletePopupComponent } from './bill-item-pos-delete-dialog.component';

export const billItemRoute: Routes = [
    {
        path: 'bill-item-pos',
        component: BillItemPosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bill-item-pos/:id',
        component: BillItemPosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billItemPopupRoute: Routes = [
    {
        path: 'bill-item-pos-new',
        component: BillItemPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-item-pos/:id/edit',
        component: BillItemPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-item-pos/:id/delete',
        component: BillItemPosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
