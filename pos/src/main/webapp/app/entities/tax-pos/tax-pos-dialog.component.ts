import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TaxPos } from './tax-pos.model';
import { TaxPosPopupService } from './tax-pos-popup.service';
import { TaxPosService } from './tax-pos.service';

@Component({
    selector: 'jhi-tax-pos-dialog',
    templateUrl: './tax-pos-dialog.component.html'
})
export class TaxPosDialogComponent implements OnInit {

    tax: TaxPos;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private taxService: TaxPosService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tax.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taxService.update(this.tax));
        } else {
            this.subscribeToSaveResponse(
                this.taxService.create(this.tax));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TaxPos>>) {
        result.subscribe((res: HttpResponse<TaxPos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TaxPos) {
        this.eventManager.broadcast({ name: 'taxListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tax-pos-popup',
    template: ''
})
export class TaxPosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxPopupService: TaxPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.taxPopupService
                    .open(TaxPosDialogComponent as Component, params['id']);
            } else {
                this.taxPopupService
                    .open(TaxPosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
