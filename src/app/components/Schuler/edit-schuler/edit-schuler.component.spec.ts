import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchulerComponent } from './edit-schuler.component';

describe('EditSchulerComponent', () => {
  let component: EditSchulerComponent;
  let fixture: ComponentFixture<EditSchulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
