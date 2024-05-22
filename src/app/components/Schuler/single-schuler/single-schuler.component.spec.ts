import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSchulerComponent } from './single-schuler.component';

describe('SingleSchulerComponent', () => {
  let component: SingleSchulerComponent;
  let fixture: ComponentFixture<SingleSchulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSchulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSchulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
