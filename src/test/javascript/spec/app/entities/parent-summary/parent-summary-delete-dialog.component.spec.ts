/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ChildrenTestModule } from '../../../test.module';
import { ParentSummaryDeleteDialogComponent } from 'app/entities/parent-summary/parent-summary-delete-dialog.component';
import { ParentSummaryService } from 'app/entities/parent-summary/parent-summary.service';

describe('Component Tests', () => {
    describe('ParentSummary Management Delete Component', () => {
        let comp: ParentSummaryDeleteDialogComponent;
        let fixture: ComponentFixture<ParentSummaryDeleteDialogComponent>;
        let service: ParentSummaryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [ParentSummaryDeleteDialogComponent]
            })
                .overrideTemplate(ParentSummaryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParentSummaryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParentSummaryService);
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
