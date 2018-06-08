import { BaseEntity } from './../../shared';

export class BillPos implements BaseEntity {
    constructor(
        public id?: number,
        public billDate?: any,
        public billNo?: string,
        public totalTax?: string,
        public discount?: number,
        public total?: string,
        public paymentId?: number,
        public items?: BaseEntity[],
    ) {
    }
}
