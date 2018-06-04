import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InventoryPos } from './inventory-pos.model';
import { InventoryPosPopupService } from './inventory-pos-popup.service';
import { InventoryPosService } from './inventory-pos.service';

@Component({
    selector: 'jhi-inventory-pos-dialog',
    templateUrl: './inventory-pos-dialog.component.html'
})
export class InventoryPosDialogComponent implements OnInit {

    inventory: InventoryPos;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private inventoryService: InventoryPosService,
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
        if (this.inventory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inventoryService.update(this.inventory));
        } else {
            this.subscribeToSaveResponse(
                this.inventoryService.create(this.inventory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InventoryPos>>) {
        result.subscribe((res: HttpResponse<InventoryPos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InventoryPos) {
        this.eventManager.broadcast({ name: 'inventoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-inventory-pos-popup',
    template: ''
})
export class InventoryPosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inventoryPopupService: InventoryPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inventoryPopupService
                    .open(InventoryPosDialogComponent as Component, params['id']);
            } else {
                this.inventoryPopupService
                    .open(InventoryPosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
