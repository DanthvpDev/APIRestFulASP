import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFormComponent } from './clientes-form.component';

describe('ClientesFormComponent', () => {
  let component: ClientesFormComponent;
  let fixture: ComponentFixture<ClientesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
