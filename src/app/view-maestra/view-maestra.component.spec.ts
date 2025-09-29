import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaestraComponent } from './view-maestra.component';

describe('ViewMaestraComponent', () => {
  let component: ViewMaestraComponent;
  let fixture: ComponentFixture<ViewMaestraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMaestraComponent]
    });
    fixture = TestBed.createComponent(ViewMaestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
