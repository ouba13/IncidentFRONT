import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTicketlDeclarantComponent } from './update-ticketl-declarant.component';

describe('UpdateTicketlDeclarantComponent', () => {
  let component: UpdateTicketlDeclarantComponent;
  let fixture: ComponentFixture<UpdateTicketlDeclarantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTicketlDeclarantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTicketlDeclarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
