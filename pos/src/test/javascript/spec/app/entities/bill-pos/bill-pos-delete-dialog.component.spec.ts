/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PosTestModule } from '../../../test.module';
import { BillPosDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos-delete-dialog.component';
import { BillPosService } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos.service';

describe('Component Tests', () => {

    describe('BillPos Management Delete Component', () => {
        let comp: BillPosDeleteDialogComponent;
        let fixture: ComponentFixture<BillPosDeleteDialogComponent>;
        let service: BillPosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [BillPosDeleteDialogComponent],
                providers: [
                    BillPosService
                ]
            })
            .overrideTemplate(BillPosDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillPosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillPosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
