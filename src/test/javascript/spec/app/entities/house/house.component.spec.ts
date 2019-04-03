/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChildrenTestModule } from '../../../test.module';
import { HouseComponent } from 'app/entities/house/house.component';
import { HouseService } from 'app/entities/house/house.service';
import { House } from 'app/shared/model/house.model';

describe('Component Tests', () => {
    describe('House Management Component', () => {
        let comp: HouseComponent;
        let fixture: ComponentFixture<HouseComponent>;
        let service: HouseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [HouseComponent],
                providers: []
            })
                .overrideTemplate(HouseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HouseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new House(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.houses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
