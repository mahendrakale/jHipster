import { BaseEntity } from './../../shared';

export class BillItemPos implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public tax?: number,
        public productId?: number,
        public billNoId?: number,
    ) {
    }
}
