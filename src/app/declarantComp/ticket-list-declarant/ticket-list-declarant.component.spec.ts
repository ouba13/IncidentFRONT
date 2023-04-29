import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListDeclarantComponent } from './ticket-list-declarant.component';

describe('TicketListDeclarantComponent', () => {
  let component: TicketListDeclarantComponent;
  let fixture: ComponentFixture<TicketListDeclarantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketListDeclarantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketListDeclarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
