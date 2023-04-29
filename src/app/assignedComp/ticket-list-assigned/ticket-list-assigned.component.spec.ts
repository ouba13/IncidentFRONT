import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListAssignedComponent } from './ticket-list-assigned.component';

describe('TicketListAssignedComponent', () => {
  let component: TicketListAssignedComponent;
  let fixture: ComponentFixture<TicketListAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketListAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketListAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
