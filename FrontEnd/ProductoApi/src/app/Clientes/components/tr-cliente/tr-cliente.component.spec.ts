import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrClienteComponent } from './tr-cliente.component';

describe('TrClienteComponent', () => {
  let component: TrClienteComponent;
  let fixture: ComponentFixture<TrClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
