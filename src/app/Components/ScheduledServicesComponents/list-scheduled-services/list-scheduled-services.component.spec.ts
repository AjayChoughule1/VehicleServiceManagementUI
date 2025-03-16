import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduledServicesComponent } from './list-scheduled-services.component';

describe('ListScheduledServicesComponent', () => {
  let component: ListScheduledServicesComponent;
  let fixture: ComponentFixture<ListScheduledServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListScheduledServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListScheduledServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
