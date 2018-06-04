import { BaseEntity } from './../../shared';

export class InventoryPos implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public products?: BaseEntity[],
    ) {
    }
}
