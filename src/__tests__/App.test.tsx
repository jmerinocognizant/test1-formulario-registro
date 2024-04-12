import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';


describe('Pruebas en <Appp />', () => {

  test('debe de hacer match con el snapshot', () => {
    const { container } = render(<App />);
    expect( container ).toMatchSnapshot();
  });


  test('debe mostrar componente formulario', () => {
    render(<App />);
    //screen.debug();
    expect(screen.getByText("Registration"));
  });
});
