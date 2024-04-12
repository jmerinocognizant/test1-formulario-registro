import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react";
import { EmailFieldValidation,NameFieldValidation,PasswordFieldValidation } from '../../helpers/regularExpresion';

describe('Pruebas en helpers/regularExpresion', () => { 

    
    test('debe de validar un email correcto', () => {
        const emailOk = "prueba@correo.com";
        expect(EmailFieldValidation(emailOk)).toBeTruthy();
    });
  
    test('debe de detectar un email incorrecto', () => {
        const emailError = "pruebacorreo.com";
        expect(EmailFieldValidation(emailError)).toBeFalsy();
    });

    test('debe de validar un name correcto', () => {
        const nameOk = "nombre";
        expect(NameFieldValidation(nameOk)).toBeTruthy(); 
    });
  
    test('debe de detectar un name incorrecto', () => {
        const nameError = "12";
        expect(NameFieldValidation(nameError)).toBeFalsy();  
    });

    test('debe de validar un password correcto', () => {
        const passwordOK = "aaaAAA123$";
        expect(PasswordFieldValidation(passwordOK)).toBeTruthy();   
    });
  
    test('debe de detectar un password incorrecto', () => {
        const passwordError = "aaaa1111";
        expect(PasswordFieldValidation(passwordError)).toBeFalsy();  
    });

});