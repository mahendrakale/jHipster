import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSharedModule } from '../../shared';
import {
    BillPosService,
    BillPosPopupService,
    BillPosComponent,
    BillPosDetailComponent,
    BillPosDialogComponent,
    BillPosPopupComponent,
    BillPosDeletePopupComponent,
    BillPosDeleteDialogComponent,
    billRoute,
    billPopupRoute,
} from './';

const ENTITY_STATES = [
    ...billRoute,
    ...billPopupRoute,
];

@NgModule({
    imports: [
        PosSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BillPosComponent,
        BillPosDetailComponent,
        BillPosDialogComponent,
        BillPosDeleteDialogComponent,
        BillPosPopupComponent,
        BillPosDeletePopupComponent,
    ],
    entryComponents: [
        BillPosComponent,
        BillPosDialogComponent,
        BillPosPopupComponent,
        BillPosDeleteDialogComponent,
        BillPosDeletePopupComponent,
    ],
    providers: [
        BillPosService,
        BillPosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PosBillPosModule {}
