/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosTestModule } from '../../../test.module';
import { InventoryPosComponent } from '../../../../../../main/webapp/app/entities/inventory-pos/inventory-pos.component';
import { InventoryPosService } from '../../../../../../main/webapp/app/entities/inventory-pos/inventory-pos.service';
import { InventoryPos } from '../../../../../../main/webapp/app/entities/inventory-pos/inventory-pos.model';

describe('Component Tests', () => {

    describe('InventoryPos Management Component', () => {
        let comp: InventoryPosComponent;
        let fixture: ComponentFixture<InventoryPosComponent>;
        let service: InventoryPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [InventoryPosComponent],
                providers: [
                    InventoryPosService
                ]
            })
            .overrideTemplate(InventoryPosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InventoryPosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InventoryPos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.inventories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
