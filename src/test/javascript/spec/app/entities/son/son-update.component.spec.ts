/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ChildrenTestModule } from '../../../test.module';
import { SonUpdateComponent } from 'app/entities/son/son-update.component';
import { SonService } from 'app/entities/son/son.service';
import { Son } from 'app/shared/model/son.model';

describe('Component Tests', () => {
    describe('Son Management Update Component', () => {
        let comp: SonUpdateComponent;
        let fixture: ComponentFixture<SonUpdateComponent>;
        let service: SonService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [SonUpdateComponent]
            })
                .overrideTemplate(SonUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SonUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SonService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Son(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.son = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Son();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.son = entity;
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
