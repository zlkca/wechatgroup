import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatgroupComponent } from './wechatgroup.component';

describe('WechatgroupComponent', () => {
  let component: WechatgroupComponent;
  let fixture: ComponentFixture<WechatgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
