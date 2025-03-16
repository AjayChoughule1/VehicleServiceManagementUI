import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignRepresentativeComponent } from './asign-representative.component';

describe('AsignRepresentativeComponent', () => {
  let component: AsignRepresentativeComponent;
  let fixture: ComponentFixture<AsignRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignRepresentativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
