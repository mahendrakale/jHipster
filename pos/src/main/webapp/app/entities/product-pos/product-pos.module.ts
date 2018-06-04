import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSharedModule } from '../../shared';
import {
    ProductPosService,
    ProductPosPopupService,
    ProductPosComponent,
    ProductPosDetailComponent,
    ProductPosDialogComponent,
    ProductPosPopupComponent,
    ProductPosDeletePopupComponent,
    ProductPosDeleteDialogComponent,
    productRoute,
    productPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        PosSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductPosComponent,
        ProductPosDetailComponent,
        ProductPosDialogComponent,
        ProductPosDeleteDialogComponent,
        ProductPosPopupComponent,
        ProductPosDeletePopupComponent,
    ],
    entryComponents: [
        ProductPosComponent,
        ProductPosDialogComponent,
        ProductPosPopupComponent,
        ProductPosDeleteDialogComponent,
        ProductPosDeletePopupComponent,
    ],
    providers: [
        ProductPosService,
        ProductPosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PosProductPosModule {}
