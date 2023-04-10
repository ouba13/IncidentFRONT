import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestCodeComponent } from './rest-code.component';

describe('RestCodeComponent', () => {
  let component: RestCodeComponent;
  let fixture: ComponentFixture<RestCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
