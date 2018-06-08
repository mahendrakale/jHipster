import { BaseEntity } from './../../shared';

export const enum PaymentMode {
    'CASH',
    'CARD',
    'WALLET'
}

export class PaymentPos implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public card?: string,
        public paymentMode?: PaymentMode,
    ) {
    }
}
