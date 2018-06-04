import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TaxPos } from './tax-pos.model';
import { TaxPosPopupService } from './tax-pos-popup.service';
import { TaxPosService } from './tax-pos.service';

@Component({
    selector: 'jhi-tax-pos-delete-dialog',
    templateUrl: './tax-pos-delete-dialog.component.html'
})
export class TaxPosDeleteDialogComponent {

    tax: TaxPos;

    constructor(
        private taxService: TaxPosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taxService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'taxListModification',
                content: 'Deleted an tax'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tax-pos-delete-popup',
    template: ''
})
export class TaxPosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxPopupService: TaxPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.taxPopupService
                .open(TaxPosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
