import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarassignComponent } from './navbarassign.component';

describe('NavbarassignComponent', () => {
  let component: NavbarassignComponent;
  let fixture: ComponentFixture<NavbarassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarassignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
