/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PosTestModule } from '../../../test.module';
import { BillItemPosDetailComponent } from '../../../../../../main/webapp/app/entities/bill-item-pos/bill-item-pos-detail.component';
import { BillItemPosService } from '../../../../../../main/webapp/app/entities/bill-item-pos/bill-item-pos.service';
import { BillItemPos } from '../../../../../../main/webapp/app/entities/bill-item-pos/bill-item-pos.model';

describe('Component Tests', () => {

    describe('BillItemPos Management Detail Component', () => {
        let comp: BillItemPosDetailComponent;
        let fixture: ComponentFixture<BillItemPosDetailComponent>;
        let service: BillItemPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [BillItemPosDetailComponent],
                providers: [
                    BillItemPosService
                ]
            })
            .overrideTemplate(BillItemPosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillItemPosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillItemPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BillItemPos(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.billItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
