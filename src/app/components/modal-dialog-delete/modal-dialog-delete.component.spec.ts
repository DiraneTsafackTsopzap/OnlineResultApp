import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogDeleteComponent } from './modal-dialog-delete.component';

describe('ModalDialogDeleteComponent', () => {
  let component: ModalDialogDeleteComponent;
  let fixture: ComponentFixture<ModalDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDialogDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
