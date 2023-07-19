import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwsTableComponent } from './pws-table.component';

describe('PwsTableComponent', () => {
  let component: PwsTableComponent;
  let fixture: ComponentFixture<PwsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
