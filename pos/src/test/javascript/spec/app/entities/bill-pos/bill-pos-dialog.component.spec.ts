/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PosTestModule } from '../../../test.module';
import { BillPosDialogComponent } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos-dialog.component';
import { BillPosService } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos.service';
import { BillPos } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos.model';
import { PaymentPosService } from '../../../../../../main/webapp/app/entities/payment-pos';

describe('Component Tests', () => {

    describe('BillPos Management Dialog Component', () => {
        let comp: BillPosDialogComponent;
        let fixture: ComponentFixture<BillPosDialogComponent>;
        let service: BillPosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [BillPosDialogComponent],
                providers: [
                    PaymentPosService,
                    BillPosService
                ]
            })
            .overrideTemplate(BillPosDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillPosDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillPosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillPos(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bill = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillPos();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bill = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
