import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillItemPos } from './bill-item-pos.model';
import { BillItemPosPopupService } from './bill-item-pos-popup.service';
import { BillItemPosService } from './bill-item-pos.service';

@Component({
    selector: 'jhi-bill-item-pos-delete-dialog',
    templateUrl: './bill-item-pos-delete-dialog.component.html'
})
export class BillItemPosDeleteDialogComponent {

    billItem: BillItemPos;

    constructor(
        private billItemService: BillItemPosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'billItemListModification',
                content: 'Deleted an billItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bill-item-pos-delete-popup',
    template: ''
})
export class BillItemPosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billItemPopupService: BillItemPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.billItemPopupService
                .open(BillItemPosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
