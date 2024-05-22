import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchulerComponent } from './view-schuler.component';

describe('ViewSchulerComponent', () => {
  let component: ViewSchulerComponent;
  let fixture: ComponentFixture<ViewSchulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSchulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSchulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
