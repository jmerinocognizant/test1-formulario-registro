
import { useFormValidation, FormField, RegExpElement } from '../hooks/useFormValidation';
import { useState} from 'react';
import { FormValidateField } from './FormValidateField';
import { AlertDismissButton } from './AlertDismissButton';
import { EmailFieldValidation, NameFieldValidation, PasswordFieldValidation } from '../helpers/regularExpresion';


interface FormData extends FormField  {
  email: string;
  name: string;
  password: string;
}

const formFields:FormData = {
  email: '',
  name: '',
  password:'',
}

/*
const formValidations:RegExpElement = {
  email: [ (value:string) => RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value),'debe ser un email con formato válido'],
  name: [ (value:string) => RegExp(/^[A-Za-z]{4,15}$/).test(value),'debe tener entre 6 y 16 letras'],
  password: [ (value:string) =>RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_@!$&-]).{5,10}$').test(value),'debe tener entre 6 y 8 caracteres, incluir una letra, mayúsculas y caracteres especiales'],
}
*/
const formValidations:RegExpElement = {
  email: [ EmailFieldValidation ,'debe ser un email con formato válido'],
  name: [ NameFieldValidation ,'debe tener entre 6 y 16 letras'],
  password: [ PasswordFieldValidation ,'debe tener entre 6 y 8 caracteres, incluir una letra, mayúsculas y caracteres especiales'],
}

export const FormularioRegistro = () => {

    const {email, name, password, emailValid, nameValid, passwordValid,
      onInputChange, onResetForm, isFormValid,} = useFormValidation( formFields, formValidations);  

    const [privacyPolicy, setPrivacyPolicy] = useState<boolean>(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitSuccessMessage, setSubmitSuccessMessage] = useState(false);


    const onPrivacyPolicyChange = () => {
        setPrivacyPolicy( v => !v);
    }
    
    const resetForm = () => {
      onResetForm();
      setPrivacyPolicy(false);
    }

    const onSubmit = () => {
      setFormSubmitted(true);
      setSubmitSuccessMessage(false);

      if(!isFormValid) return;

      setSubmitSuccessMessage(true);
    }

    const onCloseAlertHandler = () =>{
      resetForm();
      setSubmitSuccessMessage(false);
      setFormSubmitted(false);
    }


  return (
    <>
      <div className='container login-container rounded mt-5 justify-content-md-center'>
        <h2 className="d-flex justify-content-center text-secondary">Registration</h2>
        <hr/>

        <FormValidateField 
          name="email"
          type="email"
          value={email} 
          imgClassName="bi bi-envelope-fill" 
          placeholder="Email" 
          onInputChange={onInputChange}
          error={ !!emailValid && formSubmitted}
          helperText = {formSubmitted? emailValid : null}
          inputProps={{
            'aria-label': 'email'
          }}
          />

        <hr/>

        <FormValidateField 
          name="name"
          type="text"
          value={name} 
          imgClassName="bi bi-person-fill" 
          placeholder="Name" 
          onInputChange={onInputChange}
          error={ !!nameValid && formSubmitted}
          helperText = {formSubmitted? nameValid : null}
          inputProps={{
            'aria-label': 'name'
          }}
          />

        <hr/>

        <FormValidateField 
          name="password"
          type="password"
          value={password} 
          imgClassName="bi bi-person-fill" 
          placeholder="Password" 
          onInputChange={onInputChange}
          error={ !!passwordValid && formSubmitted}
          helperText = {formSubmitted? passwordValid : null}
          inputProps={{
            'data-testid': 'password'
          }}
          />

        <hr/>
        
        <div className="form-check">
          <input 
            className="form-check-input border-primary rounded-0" 
            type="checkbox" 
            value="privacyPolicy" 
            id="privacyPolicy"
            name="privacyPolicy"
            checked = {privacyPolicy}
            onChange={ onPrivacyPolicyChange }
            aria-label="check-privacy-policy"></input>
          <label className="form-check-label text-secondary" htmlFor="checkbox-privacy">
            I Agree to Privacy Policy
          </label>
        </div>
        
        <hr/>
        
        <button 
          type="button"
          disabled={!privacyPolicy}
          className="btn btn-primary w-100"
          onClick={onSubmit}
          aria-label="btn-submit">Submit</button>

        { 
           submitSuccessMessage && <AlertDismissButton onCloseAlert={onCloseAlertHandler} />
        }

      </div>
      
    </>
  )
}
