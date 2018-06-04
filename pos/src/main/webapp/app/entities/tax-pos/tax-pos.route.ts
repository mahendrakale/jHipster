import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TaxPosComponent } from './tax-pos.component';
import { TaxPosDetailComponent } from './tax-pos-detail.component';
import { TaxPosPopupComponent } from './tax-pos-dialog.component';
import { TaxPosDeletePopupComponent } from './tax-pos-delete-dialog.component';

export const taxRoute: Routes = [
    {
        path: 'tax-pos',
        component: TaxPosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tax-pos/:id',
        component: TaxPosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taxPopupRoute: Routes = [
    {
        path: 'tax-pos-new',
        component: TaxPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tax-pos/:id/edit',
        component: TaxPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tax-pos/:id/delete',
        component: TaxPosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
