/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChildrenTestModule } from '../../../test.module';
import { ChildDetailComponent } from 'app/entities/child/child-detail.component';
import { Child } from 'app/shared/model/child.model';

describe('Component Tests', () => {
    describe('Child Management Detail Component', () => {
        let comp: ChildDetailComponent;
        let fixture: ComponentFixture<ChildDetailComponent>;
        const route = ({ data: of({ child: new Child(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [ChildDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ChildDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChildDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.child).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
