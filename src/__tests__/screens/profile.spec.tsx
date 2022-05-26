import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile', () => {
    it('Should be correctly showed a placeholder input username', () => {
      const { getByPlaceholderText } = render(<Profile />);

      const inputName = getByPlaceholderText('Nome');

      expect(inputName).toBeTruthy();
    });

    it('Should be loaded user data', () => {
      const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Tony');
    expect(inputSurname.props.value).toEqual('Stark');
  });

  it('Should exist an exactly title', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Perfil');
  });
});
