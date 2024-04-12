import { fireEvent, render, screen } from "@testing-library/react";
import { FormValidateField } from "../../components/FormValidateField";

describe('Pruebas en <FormValidateField />', () => { 

    const onInputChangeHandler = jest.fn();

    const initArg = {
      name: "name",
      type: "text",
      value: "",
      imgClassName: "bi bi-person-fill",
      placeholder: "nombre usuario",
      onInputChange: onInputChangeHandler,
      error: false,
      helperText: "validation error",
    }

    test('debe de hacer match con el snapshot', () => {
        const { container } = render(
            < FormValidateField {...initArg} />
       );
       expect( container ).toMatchSnapshot();
    });

    test('debe de llamar a la función al cambiar de valor del textbox', () =>{
      render(
        < FormValidateField {...initArg} />
      );
      const inputValue = "nombre"
      const input = screen.getByRole('textbox') as HTMLInputElement;
        
      fireEvent.input(input,{target: {value: inputValue}});
      
      expect(onInputChangeHandler).toBeCalled();
    })

    test('debe de mostrar el mensaje de error', () =>{
      render(
        < FormValidateField {...initArg} error={true} />
      );

      expect(screen.getByText("validation error"));
    })

});