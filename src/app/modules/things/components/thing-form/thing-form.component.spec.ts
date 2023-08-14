import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingFormComponent } from './thing-form.component';

describe('ThingFormComponent', () => {
  let component: ThingFormComponent;
  let fixture: ComponentFixture<ThingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThingFormComponent]
    });
    fixture = TestBed.createComponent(ThingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
