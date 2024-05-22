import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRaumComponent } from './list-raum.component';

describe('ListRaumComponent', () => {
  let component: ListRaumComponent;
  let fixture: ComponentFixture<ListRaumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRaumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRaumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
