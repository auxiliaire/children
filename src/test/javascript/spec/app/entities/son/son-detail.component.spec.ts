/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChildrenTestModule } from '../../../test.module';
import { SonDetailComponent } from 'app/entities/son/son-detail.component';
import { Son } from 'app/shared/model/son.model';

describe('Component Tests', () => {
    describe('Son Management Detail Component', () => {
        let comp: SonDetailComponent;
        let fixture: ComponentFixture<SonDetailComponent>;
        const route = ({ data: of({ son: new Son(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [SonDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SonDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SonDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.son).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
