import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "../../components/ErrorMessage";

describe('Pruebas en <ErrorMessage />', () => { 

    test('debe de hacer match con el snapshot', () => {
        const { container } = render(
            < ErrorMessage message="Error message"/>
       );

       expect( container ).toMatchSnapshot();
    });

    test('debe de mostrar el texto del mensaje', () =>{
      render(
        < ErrorMessage message="Error message"/>
      );

      expect(screen.getByText("Error message"));
  })

});