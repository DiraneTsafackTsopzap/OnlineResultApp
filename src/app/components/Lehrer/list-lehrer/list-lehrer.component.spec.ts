import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLehrerComponent } from './list-lehrer.component';

describe('ListLehrerComponent', () => {
  let component: ListLehrerComponent;
  let fixture: ComponentFixture<ListLehrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLehrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLehrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
