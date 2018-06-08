import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSharedModule } from '../../shared';
import {
    TaxPosService,
    TaxPosPopupService,
    TaxPosComponent,
    TaxPosDetailComponent,
    TaxPosDialogComponent,
    TaxPosPopupComponent,
    TaxPosDeletePopupComponent,
    TaxPosDeleteDialogComponent,
    taxRoute,
    taxPopupRoute,
} from './';

const ENTITY_STATES = [
    ...taxRoute,
    ...taxPopupRoute,
];

@NgModule({
    imports: [
        PosSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TaxPosComponent,
        TaxPosDetailComponent,
        TaxPosDialogComponent,
        TaxPosDeleteDialogComponent,
        TaxPosPopupComponent,
        TaxPosDeletePopupComponent,
    ],
    entryComponents: [
        TaxPosComponent,
        TaxPosDialogComponent,
        TaxPosPopupComponent,
        TaxPosDeleteDialogComponent,
        TaxPosDeletePopupComponent,
    ],
    providers: [
        TaxPosService,
        TaxPosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PosTaxPosModule {}
