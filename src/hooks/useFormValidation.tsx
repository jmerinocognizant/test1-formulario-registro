import { useState, useEffect, useMemo } from 'react';

export type RegExpTuple = [
    Function, string
  ]
  
export type RegExpElement = {
    [name:string]: RegExpTuple;
}

export type FormField = {
    [field:string]: string;
}

export type FormValidation = {
    [name:string]: string | null;
}

export const useFormValidation = <T extends FormField,U extends RegExpElement>(initialForm:T,formValidations:U) =>{

    const [formState, setFormState] = useState(initialForm);
    const [formValidation,setFormValidation] = useState<FormValidation>({});

    useEffect( () => {
        setFormState(initialForm);
    },[initialForm])

    useEffect( () => {
        createValidators();
    },[formState])

    const onInputChange = ({target}:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        /*
        setFormState({
            ...formState,
            [name]:value,
        });
        */
       //solve bug for test
       setFormState(prevState => ({...prevState, [name]:value}));
    }

    const onResetForm = () => {
        setFormState(initialForm);

    }

    const createValidators = () =>{
       const formCheckValues:FormValidation = {};

       Object.keys(formValidations).forEach((formField) => {
                const [fn, errorMessage = 'error de validación']:RegExpTuple = formValidations[formField];
                formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null: errorMessage;

        });

       setFormValidation( formCheckValues );
    }

    const isFormValid = useMemo( () =>{
        for (const formField of Object.keys(formValidation)) {
            if(formValidation[formField] !== null ) return false;
        }
        return true;
    }, [formValidation])

    return {
        ...formState,
        formState,
        ...formValidation,
        formValidation,
        onInputChange,
        onResetForm,
        isFormValid,
    }
}