import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageAdminComponent } from './home-page-admin.component';

describe('HomePageAdminComponent', () => {
  let component: HomePageAdminComponent;
  let fixture: ComponentFixture<HomePageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
