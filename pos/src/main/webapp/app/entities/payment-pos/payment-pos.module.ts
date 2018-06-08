import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSharedModule } from '../../shared';
import {
    PaymentPosService,
    PaymentPosPopupService,
    PaymentPosComponent,
    PaymentPosDetailComponent,
    PaymentPosDialogComponent,
    PaymentPosPopupComponent,
    PaymentPosDeletePopupComponent,
    PaymentPosDeleteDialogComponent,
    paymentRoute,
    paymentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...paymentRoute,
    ...paymentPopupRoute,
];

@NgModule({
    imports: [
        PosSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaymentPosComponent,
        PaymentPosDetailComponent,
        PaymentPosDialogComponent,
        PaymentPosDeleteDialogComponent,
        PaymentPosPopupComponent,
        PaymentPosDeletePopupComponent,
    ],
    entryComponents: [
        PaymentPosComponent,
        PaymentPosDialogComponent,
        PaymentPosPopupComponent,
        PaymentPosDeleteDialogComponent,
        PaymentPosDeletePopupComponent,
    ],
    providers: [
        PaymentPosService,
        PaymentPosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PosPaymentPosModule {}
