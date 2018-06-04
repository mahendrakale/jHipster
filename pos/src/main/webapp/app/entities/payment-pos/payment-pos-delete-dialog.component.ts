import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentPos } from './payment-pos.model';
import { PaymentPosPopupService } from './payment-pos-popup.service';
import { PaymentPosService } from './payment-pos.service';

@Component({
    selector: 'jhi-payment-pos-delete-dialog',
    templateUrl: './payment-pos-delete-dialog.component.html'
})
export class PaymentPosDeleteDialogComponent {

    payment: PaymentPos;

    constructor(
        private paymentService: PaymentPosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paymentListModification',
                content: 'Deleted an payment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-pos-delete-popup',
    template: ''
})
export class PaymentPosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentPopupService: PaymentPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paymentPopupService
                .open(PaymentPosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
