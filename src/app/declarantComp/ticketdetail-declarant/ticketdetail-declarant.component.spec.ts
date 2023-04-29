import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketdetailDeclarantComponent } from './ticketdetail-declarant.component';

describe('TicketdetailDeclarantComponent', () => {
  let component: TicketdetailDeclarantComponent;
  let fixture: ComponentFixture<TicketdetailDeclarantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketdetailDeclarantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketdetailDeclarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
