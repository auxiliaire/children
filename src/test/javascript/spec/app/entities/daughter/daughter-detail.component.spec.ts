/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChildrenTestModule } from '../../../test.module';
import { DaughterDetailComponent } from 'app/entities/daughter/daughter-detail.component';
import { Daughter } from 'app/shared/model/daughter.model';

describe('Component Tests', () => {
    describe('Daughter Management Detail Component', () => {
        let comp: DaughterDetailComponent;
        let fixture: ComponentFixture<DaughterDetailComponent>;
        const route = ({ data: of({ daughter: new Daughter(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [DaughterDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DaughterDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DaughterDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.daughter).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
