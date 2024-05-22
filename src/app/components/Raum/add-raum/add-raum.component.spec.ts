import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRaumComponent } from './add-raum.component';

describe('AddRaumComponent', () => {
  let component: AddRaumComponent;
  let fixture: ComponentFixture<AddRaumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRaumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRaumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
