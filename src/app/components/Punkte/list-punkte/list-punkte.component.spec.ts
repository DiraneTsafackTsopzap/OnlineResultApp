import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPunkteComponent } from './list-punkte.component';

describe('ListPunkteComponent', () => {
  let component: ListPunkteComponent;
  let fixture: ComponentFixture<ListPunkteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPunkteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPunkteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
