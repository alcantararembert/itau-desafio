import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMoreComponent } from './button-more.component';

describe('ButtonMoreComponent', () => {
  let component: ButtonMoreComponent;
  let fixture: ComponentFixture<ButtonMoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonMoreComponent]
    });
    fixture = TestBed.createComponent(ButtonMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
