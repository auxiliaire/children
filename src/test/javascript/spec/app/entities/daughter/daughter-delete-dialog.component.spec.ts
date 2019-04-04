/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ChildrenTestModule } from '../../../test.module';
import { DaughterDeleteDialogComponent } from 'app/entities/daughter/daughter-delete-dialog.component';
import { DaughterService } from 'app/entities/daughter/daughter.service';

describe('Component Tests', () => {
    describe('Daughter Management Delete Component', () => {
        let comp: DaughterDeleteDialogComponent;
        let fixture: ComponentFixture<DaughterDeleteDialogComponent>;
        let service: DaughterService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [DaughterDeleteDialogComponent]
            })
                .overrideTemplate(DaughterDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DaughterDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DaughterService);
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
