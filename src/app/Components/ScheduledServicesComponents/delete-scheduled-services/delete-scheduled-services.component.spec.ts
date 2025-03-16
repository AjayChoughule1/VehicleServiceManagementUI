import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScheduledServicesComponent } from './delete-scheduled-services.component';

describe('DeleteScheduledServicesComponent', () => {
  let component: DeleteScheduledServicesComponent;
  let fixture: ComponentFixture<DeleteScheduledServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteScheduledServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteScheduledServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
