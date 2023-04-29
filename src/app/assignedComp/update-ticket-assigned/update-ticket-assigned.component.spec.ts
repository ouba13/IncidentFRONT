import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTicketAssignedComponent } from './update-ticket-assigned.component';

describe('UpdateTicketAssignedComponent', () => {
  let component: UpdateTicketAssignedComponent;
  let fixture: ComponentFixture<UpdateTicketAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTicketAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTicketAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
