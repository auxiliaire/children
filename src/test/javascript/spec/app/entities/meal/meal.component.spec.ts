/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChildrenTestModule } from '../../../test.module';
import { MealComponent } from 'app/entities/meal/meal.component';
import { MealService } from 'app/entities/meal/meal.service';
import { Meal } from 'app/shared/model/meal.model';

describe('Component Tests', () => {
    describe('Meal Management Component', () => {
        let comp: MealComponent;
        let fixture: ComponentFixture<MealComponent>;
        let service: MealService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [MealComponent],
                providers: []
            })
                .overrideTemplate(MealComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Meal(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.meals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
