import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketAssignedComponent } from './view-ticket-assigned.component';

describe('ViewTicketAssignedComponent', () => {
  let component: ViewTicketAssignedComponent;
  let fixture: ComponentFixture<ViewTicketAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTicketAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTicketAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
