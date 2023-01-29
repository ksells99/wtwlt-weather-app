import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeHourForecastComponent } from './three-hour-forecast.component';

describe('ThreeHourForecastComponent', () => {
  let component: ThreeHourForecastComponent;
  let fixture: ComponentFixture<ThreeHourForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeHourForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeHourForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
