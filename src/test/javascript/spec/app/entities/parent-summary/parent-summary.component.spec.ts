/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChildrenTestModule } from '../../../test.module';
import { ParentSummaryComponent } from 'app/entities/parent-summary/parent-summary.component';
import { ParentSummaryService } from 'app/entities/parent-summary/parent-summary.service';
import { ParentSummary } from 'app/shared/model/parent-summary.model';

describe('Component Tests', () => {
    describe('ParentSummary Management Component', () => {
        let comp: ParentSummaryComponent;
        let fixture: ComponentFixture<ParentSummaryComponent>;
        let service: ParentSummaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [ParentSummaryComponent],
                providers: []
            })
                .overrideTemplate(ParentSummaryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParentSummaryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParentSummaryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ParentSummary(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.parentSummaries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
