import { renderHook, act } from "@testing-library/react";

import { RegExpElement, useFormValidation } from "../../hooks/useFormValidation";

describe('Pruebas en useFormValidation', () => { 

    const createChangeEvent = (name:string,value:string) => {
        return {
            target: {name,value}
        } as React.ChangeEvent<HTMLInputElement>;
    }

        const initialForm = {
            email: '',
            name: '',
            password:'',
          }

        
        const formValidations:RegExpElement = {
          email: [(value:string) => value.includes('@') , 'validation error email'],
          password: [(value:string) => value.length > 5 , 'validation error password'],
        }  

      test('debe de regresar los valores por defecto', () => {
          const { result } = renderHook( () => useFormValidation(initialForm,formValidations));
          expect(result.current).toEqual({
            email: initialForm.email,
            name: initialForm.name,
            password: initialForm.password,
            formState: initialForm,
            formValidation: expect.any( Object ), 
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function ),
            isFormValid: false,
            emailValid: 'validation error email',
            passwordValid: 'validation error password',
          });
      });

      test('debe de cambiar el valor del name en el formulario', () => {
        const newValue = "Nombre";
        const { result } = renderHook( () => useFormValidation(initialForm,formValidations));
        const { onInputChange } = result.current;

        act(() =>{
            onInputChange(createChangeEvent('name',newValue));
        });

        expect( result.current.name ).toBe(newValue);
        expect( result.current.formState.name).toBe(newValue);
      });

      
      test('debe de hacer reset formulario', () => {
        const newValue = "Nombre";
        const { result } = renderHook( () => useFormValidation(initialForm,formValidations));
        const { onInputChange, onResetForm } = result.current;

        act(() =>{
            onInputChange(createChangeEvent('name',newValue));
            onResetForm();
        });

        expect( result.current.name ).toBe(initialForm.name); 
        expect( result.current.formState.name).toBe(initialForm.name);
      });

      test('debe de hacer detectar de los campos del formulario con error', () => {
        const valueEmailError = "pruebacorreo.com";
        const valuePasswordError = "aaaa";
        const { result } = renderHook( () => useFormValidation(initialForm,formValidations));
        const { onInputChange } = result.current;

        act(() =>{
            onInputChange(createChangeEvent('email',valueEmailError));
            onInputChange(createChangeEvent('password',valuePasswordError));
        });

        //console.log(result.current);

        expect( result.current.email ).toBe(valueEmailError); 
        expect( result.current.formState.email).toBe(valueEmailError);
        expect( result.current.password ).toBe(valuePasswordError); 
        expect( result.current.formState.password).toBe(valuePasswordError);

        expect( result.current.isFormValid ).toBeFalsy();
      });

      test('debe de hacer validación de los campos del formulario ok', async() => {
        const valueEmailOk = "prueba@correo.com";
        const valuePasswordOk = "aaaaaaaaa";
        const { result } = renderHook( () => useFormValidation(initialForm,formValidations));
        const { onInputChange } = result.current;

        //console.log(result.current);

        const event1 = createChangeEvent('email',valueEmailOk);
        const event2 = createChangeEvent('password',valuePasswordOk);

        //console.log({event1,event2});

       act(() =>{
            onInputChange(event1);
            onInputChange(event2);
        });


        //console.log(result.current);

        expect( result.current.email ).toBe(valueEmailOk); 
        expect( result.current.formState.email).toBe(valueEmailOk); 
        expect( result.current.password ).toEqual(valuePasswordOk); 
        expect( result.current.formState.password).toEqual(valuePasswordOk);

        expect( result.current.isFormValid ).toBeTruthy();
        
      });

  });
  