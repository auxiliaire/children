/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChildrenTestModule } from '../../../test.module';
import { ParentSummaryDetailComponent } from 'app/entities/parent-summary/parent-summary-detail.component';
import { ParentSummary } from 'app/shared/model/parent-summary.model';

describe('Component Tests', () => {
    describe('ParentSummary Management Detail Component', () => {
        let comp: ParentSummaryDetailComponent;
        let fixture: ComponentFixture<ParentSummaryDetailComponent>;
        const route = ({ data: of({ parentSummary: new ParentSummary(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [ParentSummaryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParentSummaryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParentSummaryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.parentSummary).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
