/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PosTestModule } from '../../../test.module';
import { BillPosDetailComponent } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos-detail.component';
import { BillPosService } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos.service';
import { BillPos } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos.model';

describe('Component Tests', () => {

    describe('BillPos Management Detail Component', () => {
        let comp: BillPosDetailComponent;
        let fixture: ComponentFixture<BillPosDetailComponent>;
        let service: BillPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [BillPosDetailComponent],
                providers: [
                    BillPosService
                ]
            })
            .overrideTemplate(BillPosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillPosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BillPos(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bill).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
