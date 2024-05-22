import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLehrerComponent } from './add-lehrer.component';

describe('AddLehrerComponent', () => {
  let component: AddLehrerComponent;
  let fixture: ComponentFixture<AddLehrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLehrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLehrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
