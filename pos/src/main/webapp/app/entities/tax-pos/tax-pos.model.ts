import { BaseEntity } from './../../shared';

export const enum Category {
    'FOOD',
    'CLOTHS',
    'BEVRAGES'
}

export class TaxPos implements BaseEntity {
    constructor(
        public id?: number,
        public taxName?: string,
        public category?: Category,
        public percent?: number,
    ) {
    }
}
