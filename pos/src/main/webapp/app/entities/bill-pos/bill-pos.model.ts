import { BaseEntity } from './../../shared';

export class BillPos implements BaseEntity {
    constructor(
        public id?: number,
        public billDate?: any,
        public billNo?: string,
        public totalTax?: number,
        public discount?: number,
        public total?: number,
        public paymentId?: number,
        public createdById?: number,
        public billNos?: BaseEntity[],
    ) {
    }
}
