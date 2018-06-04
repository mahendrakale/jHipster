import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PosSharedModule } from '../../shared';
import {
    InventoryPosService,
    InventoryPosPopupService,
    InventoryPosComponent,
    InventoryPosDetailComponent,
    InventoryPosDialogComponent,
    InventoryPosPopupComponent,
    InventoryPosDeletePopupComponent,
    InventoryPosDeleteDialogComponent,
    inventoryRoute,
    inventoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...inventoryRoute,
    ...inventoryPopupRoute,
];

@NgModule({
    imports: [
        PosSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InventoryPosComponent,
        InventoryPosDetailComponent,
        InventoryPosDialogComponent,
        InventoryPosDeleteDialogComponent,
        InventoryPosPopupComponent,
        InventoryPosDeletePopupComponent,
    ],
    entryComponents: [
        InventoryPosComponent,
        InventoryPosDialogComponent,
        InventoryPosPopupComponent,
        InventoryPosDeleteDialogComponent,
        InventoryPosDeletePopupComponent,
    ],
    providers: [
        InventoryPosService,
        InventoryPosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PosInventoryPosModule {}
