import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketDeclarantComponent } from './add-ticket-declarant.component';

describe('AddTicketDeclarantComponent', () => {
  let component: AddTicketDeclarantComponent;
  let fixture: ComponentFixture<AddTicketDeclarantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTicketDeclarantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTicketDeclarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
