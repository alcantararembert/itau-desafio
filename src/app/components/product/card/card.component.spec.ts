import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let router: Router;
  let updateButton: DebugElement;
  let deleteButton: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Find update and delete buttons using their CSS classes
    updateButton = fixture.debugElement.query(By.css('.update-button'));
    deleteButton = fixture.debugElement.query(By.css('.delete-button'));

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to update page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.product.id = 1;
    updateButton.triggerEventHandler('click', null); // Simulate a button click
    expect(navigateSpy).toHaveBeenCalledWith(['/update/1']);
  });

  it('should navigate to delete page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.product.id = 2;
    deleteButton.triggerEventHandler('click', null); // Simulate a button click
    expect(navigateSpy).toHaveBeenCalledWith(['/delete/2']);
  });
});
