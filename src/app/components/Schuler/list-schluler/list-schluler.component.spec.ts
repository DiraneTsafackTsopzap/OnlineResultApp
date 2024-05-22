import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchlulerComponent } from './list-schluler.component';

describe('ListSchlulerComponent', () => {
  let component: ListSchlulerComponent;
  let fixture: ComponentFixture<ListSchlulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSchlulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSchlulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
