import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveServiceRepresentativeComponent } from './remove-service-representative.component';

describe('RemoveServiceRepresentativeComponent', () => {
  let component: RemoveServiceRepresentativeComponent;
  let fixture: ComponentFixture<RemoveServiceRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveServiceRepresentativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveServiceRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
