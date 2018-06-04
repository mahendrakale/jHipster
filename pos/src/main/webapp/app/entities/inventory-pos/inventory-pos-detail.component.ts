import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InventoryPos } from './inventory-pos.model';
import { InventoryPosService } from './inventory-pos.service';

@Component({
    selector: 'jhi-inventory-pos-detail',
    templateUrl: './inventory-pos-detail.component.html'
})
export class InventoryPosDetailComponent implements OnInit, OnDestroy {

    inventory: InventoryPos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private inventoryService: InventoryPosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInventories();
    }

    load(id) {
        this.inventoryService.find(id)
            .subscribe((inventoryResponse: HttpResponse<InventoryPos>) => {
                this.inventory = inventoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInventories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'inventoryListModification',
            (response) => this.load(this.inventory.id)
        );
    }
}
