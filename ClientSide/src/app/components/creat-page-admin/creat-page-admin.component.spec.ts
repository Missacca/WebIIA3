import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatPageAdminComponent } from './creat-page-admin.component';

describe('CreatPageAdminComponent', () => {
  let component: CreatPageAdminComponent;
  let fixture: ComponentFixture<CreatPageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatPageAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
