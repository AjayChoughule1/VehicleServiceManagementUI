import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInviceComponent } from './create-invice.component';

describe('CreateInviceComponent', () => {
  let component: CreateInviceComponent;
  let fixture: ComponentFixture<CreateInviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
