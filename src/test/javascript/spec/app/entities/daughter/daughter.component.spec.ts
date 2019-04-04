/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChildrenTestModule } from '../../../test.module';
import { DaughterComponent } from 'app/entities/daughter/daughter.component';
import { DaughterService } from 'app/entities/daughter/daughter.service';
import { Daughter } from 'app/shared/model/daughter.model';

describe('Component Tests', () => {
    describe('Daughter Management Component', () => {
        let comp: DaughterComponent;
        let fixture: ComponentFixture<DaughterComponent>;
        let service: DaughterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [DaughterComponent],
                providers: []
            })
                .overrideTemplate(DaughterComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DaughterComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DaughterService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Daughter(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.daughters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
