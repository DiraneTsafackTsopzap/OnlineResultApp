import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPunkteComponent } from './add-punkte.component';

describe('AddPunkteComponent', () => {
  let component: AddPunkteComponent;
  let fixture: ComponentFixture<AddPunkteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPunkteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPunkteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
