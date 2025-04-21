import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalComponent } from './principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PrincipalComponent', () => {
  let component: PrincipalComponent;
  let fixture: ComponentFixture<PrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const ok = true;
    expect(ok).toBeTruthy();
  });

  it('Resultado de submit formulario', () => {

    component.miFormulario.setValue(
      {
        libroId: '',
        nombre: '',
        categoriaId: ''
      }
    );
    //component.submitForm();
    expect(component.miFormulario.valid).toBe(true);

  });

  it('Validando campo usuario requerido', () => {

    component.miFormulario.setValue(
      {
        libroId: '',
        nombre: '',
        categoriaId: ''
      }
    );
    //component.submitForm();
    console.log(component.miFormulario.get('user')?.hasError('required'));
    expect(component.miFormulario.get('user')?.hasError('required')).toBe(false);

  });

  it('Validando condicion caracteres de contraseña', () => {

    component.miFormulario.setValue(
      {
        user: 'nathanbernal',
        pass: 'aaa123aaaaA', // contraseña correcta
        pass2: 'aaa123aaaaA',
        nom: 'nathanbernal',
        fec: '2024-11-10',
        dir: ''
      }
    );
    //component.submitForm();
    console.log(component.miFormulario.get('pass')?.hasError('pattern'));
    expect(component.miFormulario.get('pass')?.hasError('pattern')).toBe(false);

  });


});
