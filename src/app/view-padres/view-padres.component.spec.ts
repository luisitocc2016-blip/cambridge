import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPadresComponent } from './view-padres.component';

describe('ViewPadresComponent', () => {
  let component: ViewPadresComponent;
  let fixture: ComponentFixture<ViewPadresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPadresComponent]
    });
    fixture = TestBed.createComponent(ViewPadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
