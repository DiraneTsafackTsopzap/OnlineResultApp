import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLehrerComponent } from './edit-lehrer.component';

describe('EditLehrerComponent', () => {
  let component: EditLehrerComponent;
  let fixture: ComponentFixture<EditLehrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLehrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLehrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
