/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ChildrenTestModule } from '../../../test.module';
import { ChildDeleteDialogComponent } from 'app/entities/child/child-delete-dialog.component';
import { ChildService } from 'app/entities/child/child.service';

describe('Component Tests', () => {
    describe('Child Management Delete Component', () => {
        let comp: ChildDeleteDialogComponent;
        let fixture: ComponentFixture<ChildDeleteDialogComponent>;
        let service: ChildService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [ChildDeleteDialogComponent]
            })
                .overrideTemplate(ChildDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChildDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChildService);
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
