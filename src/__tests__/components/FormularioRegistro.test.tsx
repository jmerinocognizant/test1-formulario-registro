import { fireEvent, render, screen } from "@testing-library/react";
import { FormularioRegistro } from "../../components/FormularioRegistro";

describe('Pruebas en <FormularioRegistro />', () => { 

  const mockSubmit = jest.fn();

    jest.mock('../../components/FormularioRegistro', () => ({
      onSubmit: mockSubmit,
    }));

    test('debe de hacer match con el snapshot', () => {
        const { container } = render(
            < FormularioRegistro />
       );

       expect( container ).toMatchSnapshot();
    });

    test('debe de mostrar el titulo del formulario', () =>{
      render(
        < FormularioRegistro />
      );

      //screen.debug();

      //expect(screen.getByText("Registration"));
      const h2Element = screen.getByRole('heading', { level: 2 });
      expect(h2Element.textContent).toBe("Registration");
    })

    test('debe de activar el botón submit al hacer check en las políticas de privacidad', () =>{
      render(
        < FormularioRegistro />
      );
      const btnSubmit = screen.getByRole('button',{name: 'btn-submit'});
      const check = screen.getByRole('checkbox',{name: 'check-privacy-policy'});

      expect(btnSubmit).toBeDisabled();
      fireEvent.click(check);
      expect(btnSubmit).toBeEnabled(); 
    })

    test('debe de mostrar mensaje si la validación de campos es correcta', () =>{
      render(
        < FormularioRegistro />
      );
      
      const inputName = screen.getByRole('textbox',{name: 'name'}) as HTMLInputElement;
      const inputEmail = screen.getByRole('textbox',{name: 'email'}) as HTMLInputElement;
      const inputPassword = screen.getByTestId('password') as HTMLInputElement;
      const check = screen.getByRole('checkbox',{name: 'check-privacy-policy'});
      const btnSubmit = screen.getByRole('button',{name: 'btn-submit'});

      //expect(inputPassword).toBeInTheDocument();

      fireEvent.change( inputName, { target: { name: 'name', value: "nombre" } });
      fireEvent.change( inputEmail, { target: { name: 'email', value: "prueba@correo.com" } });
      fireEvent.change( inputPassword, { target: { name: 'password', value: "aaaAAA12$" } });
      fireEvent.click(check); 
      
      fireEvent.click(btnSubmit);
      //screen.debug();
      expect(screen.getByText("Submit successful")).toBeInTheDocument();
    })

    test('debe no mostrar mensaje si la validación de campos no es correcta ', () =>{
      const {container} = render(
        < FormularioRegistro />
      );
      
      const inputName = screen.getByRole('textbox',{name: 'name'}) as HTMLInputElement;
      const inputEmail = screen.getByRole('textbox',{name: 'email'}) as HTMLInputElement;
      const inputPassword = screen.getByTestId('password') as HTMLInputElement;
      const check = screen.getByRole('checkbox',{name: 'check-privacy-policy'});
      const btnSubmit = screen.getByRole('button',{name: 'btn-submit'});

      //expect(inputPassword).toBeInTheDocument();

      fireEvent.change( inputName, { target: { name: 'name', value: "11" } });
      fireEvent.change( inputEmail, { target: { name: 'email', value: "pruebacorreo.com" } });
      fireEvent.change( inputPassword, { target: { name: 'password', value: "aaaaaaa" } });
      fireEvent.click(check); 
      
      fireEvent.click(btnSubmit);
      //screen.debug();

      const alerts = container.getElementsByClassName('alert-danger'); // Find elements with class name 'alert-danger'
      expect(alerts.length).toBe(3);

      const submitSuccessful = screen.queryByText("Submit successful"); 
      expect(submitSuccessful).toBeNull(); // It doesn't exist
    })

    

});
