import { BaseEntity } from './../../shared';

export const enum Category {
    'FOOD',
    'CLOTHS',
    'BEVRAGES'
}

export class ProductPos implements BaseEntity {
    constructor(
        public id?: number,
        public productName?: string,
        public description?: string,
        public category?: Category,
        public barcode?: string,
        public mfDate?: any,
        public expDate?: any,
        public price?: number,
        public taxId?: number,
        public inventoryId?: number,
    ) {
    }
}
