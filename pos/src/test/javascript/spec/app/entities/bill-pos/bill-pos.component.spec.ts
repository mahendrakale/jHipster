/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosTestModule } from '../../../test.module';
import { BillPosComponent } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos.component';
import { BillPosService } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos.service';
import { BillPos } from '../../../../../../main/webapp/app/entities/bill-pos/bill-pos.model';

describe('Component Tests', () => {

    describe('BillPos Management Component', () => {
        let comp: BillPosComponent;
        let fixture: ComponentFixture<BillPosComponent>;
        let service: BillPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [BillPosComponent],
                providers: [
                    BillPosService
                ]
            })
            .overrideTemplate(BillPosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillPosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BillPos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bills[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
