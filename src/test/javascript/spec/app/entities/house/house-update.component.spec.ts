/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ChildrenTestModule } from '../../../test.module';
import { HouseUpdateComponent } from 'app/entities/house/house-update.component';
import { HouseService } from 'app/entities/house/house.service';
import { House } from 'app/shared/model/house.model';

describe('Component Tests', () => {
    describe('House Management Update Component', () => {
        let comp: HouseUpdateComponent;
        let fixture: ComponentFixture<HouseUpdateComponent>;
        let service: HouseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [HouseUpdateComponent]
            })
                .overrideTemplate(HouseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HouseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new House(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.house = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new House();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.house = entity;
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
