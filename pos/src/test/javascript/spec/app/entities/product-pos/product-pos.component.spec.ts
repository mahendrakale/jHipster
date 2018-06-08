/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosTestModule } from '../../../test.module';
import { ProductPosComponent } from '../../../../../../main/webapp/app/entities/product-pos/product-pos.component';
import { ProductPosService } from '../../../../../../main/webapp/app/entities/product-pos/product-pos.service';
import { ProductPos } from '../../../../../../main/webapp/app/entities/product-pos/product-pos.model';

describe('Component Tests', () => {

    describe('ProductPos Management Component', () => {
        let comp: ProductPosComponent;
        let fixture: ComponentFixture<ProductPosComponent>;
        let service: ProductPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [ProductPosComponent],
                providers: [
                    ProductPosService
                ]
            })
            .overrideTemplate(ProductPosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductPosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductPos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.products[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
