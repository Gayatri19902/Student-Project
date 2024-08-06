import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAccessComponent } from './show-access.component';

describe('ShowAccessComponent', () => {
  let component: ShowAccessComponent;
  let fixture: ComponentFixture<ShowAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
