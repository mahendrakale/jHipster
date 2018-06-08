import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSharedModule } from '../../shared';
import {
    BillItemPosService,
    BillItemPosPopupService,
    BillItemPosComponent,
    BillItemPosDetailComponent,
    BillItemPosDialogComponent,
    BillItemPosPopupComponent,
    BillItemPosDeletePopupComponent,
    BillItemPosDeleteDialogComponent,
    billItemRoute,
    billItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...billItemRoute,
    ...billItemPopupRoute,
];

@NgModule({
    imports: [
        PosSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BillItemPosComponent,
        BillItemPosDetailComponent,
        BillItemPosDialogComponent,
        BillItemPosDeleteDialogComponent,
        BillItemPosPopupComponent,
        BillItemPosDeletePopupComponent,
    ],
    entryComponents: [
        BillItemPosComponent,
        BillItemPosDialogComponent,
        BillItemPosPopupComponent,
        BillItemPosDeleteDialogComponent,
        BillItemPosDeletePopupComponent,
    ],
    providers: [
        BillItemPosService,
        BillItemPosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PosBillItemPosModule {}
