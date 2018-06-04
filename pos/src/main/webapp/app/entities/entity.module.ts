import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PosTaxPosModule } from './tax-pos/tax-pos.module';
import { PosProductPosModule } from './product-pos/product-pos.module';
import { PosInventoryPosModule } from './inventory-pos/inventory-pos.module';
import { PosPaymentPosModule } from './payment-pos/payment-pos.module';
import { PosBillItemPosModule } from './bill-item-pos/bill-item-pos.module';
import { PosBillPosModule } from './bill-pos/bill-pos.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PosTaxPosModule,
        PosProductPosModule,
        PosInventoryPosModule,
        PosPaymentPosModule,
        PosBillItemPosModule,
        PosBillPosModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PosEntityModule {}
