/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PosTestModule } from '../../../test.module';
import { BillItemPosDialogComponent } from '../../../../../../main/webapp/app/entities/bill-item-pos/bill-item-pos-dialog.component';
import { BillItemPosService } from '../../../../../../main/webapp/app/entities/bill-item-pos/bill-item-pos.service';
import { BillItemPos } from '../../../../../../main/webapp/app/entities/bill-item-pos/bill-item-pos.model';
import { ProductPosService } from '../../../../../../main/webapp/app/entities/product-pos';
import { BillPosService } from '../../../../../../main/webapp/app/entities/bill-pos';

describe('Component Tests', () => {

    describe('BillItemPos Management Dialog Component', () => {
        let comp: BillItemPosDialogComponent;
        let fixture: ComponentFixture<BillItemPosDialogComponent>;
        let service: BillItemPosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [BillItemPosDialogComponent],
                providers: [
                    ProductPosService,
                    BillPosService,
                    BillItemPosService
                ]
            })
            .overrideTemplate(BillItemPosDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillItemPosDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillItemPosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillItemPos(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.billItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillItemPos();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.billItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
