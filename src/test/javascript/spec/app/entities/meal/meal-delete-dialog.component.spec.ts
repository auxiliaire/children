/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ChildrenTestModule } from '../../../test.module';
import { MealDeleteDialogComponent } from 'app/entities/meal/meal-delete-dialog.component';
import { MealService } from 'app/entities/meal/meal.service';

describe('Component Tests', () => {
    describe('Meal Management Delete Component', () => {
        let comp: MealDeleteDialogComponent;
        let fixture: ComponentFixture<MealDeleteDialogComponent>;
        let service: MealService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [MealDeleteDialogComponent]
            })
                .overrideTemplate(MealDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
