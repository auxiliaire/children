/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ChildrenTestModule } from '../../../test.module';
import { DaughterUpdateComponent } from 'app/entities/daughter/daughter-update.component';
import { DaughterService } from 'app/entities/daughter/daughter.service';
import { Daughter } from 'app/shared/model/daughter.model';

describe('Component Tests', () => {
    describe('Daughter Management Update Component', () => {
        let comp: DaughterUpdateComponent;
        let fixture: ComponentFixture<DaughterUpdateComponent>;
        let service: DaughterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [DaughterUpdateComponent]
            })
                .overrideTemplate(DaughterUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DaughterUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DaughterService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Daughter(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.daughter = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Daughter();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.daughter = entity;
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
