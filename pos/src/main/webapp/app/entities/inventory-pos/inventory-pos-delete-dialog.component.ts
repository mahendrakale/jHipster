import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InventoryPos } from './inventory-pos.model';
import { InventoryPosPopupService } from './inventory-pos-popup.service';
import { InventoryPosService } from './inventory-pos.service';

@Component({
    selector: 'jhi-inventory-pos-delete-dialog',
    templateUrl: './inventory-pos-delete-dialog.component.html'
})
export class InventoryPosDeleteDialogComponent {

    inventory: InventoryPos;

    constructor(
        private inventoryService: InventoryPosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inventoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'inventoryListModification',
                content: 'Deleted an inventory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inventory-pos-delete-popup',
    template: ''
})
export class InventoryPosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inventoryPopupService: InventoryPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.inventoryPopupService
                .open(InventoryPosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
