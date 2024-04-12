import { fireEvent, render, screen } from "@testing-library/react";
import { AlertDismissButton } from "../../components/AlertDismissButton";

describe('Pruebas en <AlertDismissButton />', () => { 

    const onCloseHandler = jest.fn();

    test('debe de hacer match con el snapshot', () => {
        const { container } = render(
            < AlertDismissButton onCloseAlert={onCloseHandler}/>
       );

       expect( container ).toMatchSnapshot();
    });

    test('debe de realizar realizar la llamada a la función onCloseAlert', () =>{
       render(
          < AlertDismissButton onCloseAlert={onCloseHandler}/>
     );

     fireEvent.click(screen.getByRole('button',{name: 'btn-close'}));
     expect( onCloseHandler ).toHaveBeenCalled();
     
    })

});
