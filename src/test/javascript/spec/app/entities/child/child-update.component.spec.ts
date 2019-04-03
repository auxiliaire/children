/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ChildrenTestModule } from '../../../test.module';
import { ChildUpdateComponent } from 'app/entities/child/child-update.component';
import { ChildService } from 'app/entities/child/child.service';
import { Child } from 'app/shared/model/child.model';

describe('Component Tests', () => {
    describe('Child Management Update Component', () => {
        let comp: ChildUpdateComponent;
        let fixture: ComponentFixture<ChildUpdateComponent>;
        let service: ChildService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [ChildUpdateComponent]
            })
                .overrideTemplate(ChildUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChildUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChildService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Child(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.child = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Child();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.child = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
