import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KommentarComponent } from './kommentar.component';

describe('KommentarComponent', () => {
  let component: KommentarComponent;
  let fixture: ComponentFixture<KommentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KommentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KommentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
