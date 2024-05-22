import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchulerComponent } from './add-schuler.component';

describe('AddSchulerComponent', () => {
  let component: AddSchulerComponent;
  let fixture: ComponentFixture<AddSchulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
