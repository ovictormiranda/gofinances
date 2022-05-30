import 'jest-fetch-mock'

import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';

jest.mock('expo-auth-session');

fetchMock.enableMocks();

describe('Auth Hook', () => {
  it('Should be able to sign in with an existing Google account', async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token'
      }
    });

    fetch.mockResponseOnce(JSON.stringify(
      {
        id: 'any_id',
        email: 'tony@stark.com',
        name: 'tony',
        photo: 'any_photo.png'
      }
    ));

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(async () => await result.current.googleSignIn());
    await waitForNextUpdate();

    console.log('USER PROFILE =>', result.current.user);

    expect(result.current.user.email)
    .toBe('tony@stark.com');
  });

  it("Shouldn't connect if press to canceling the authentication with Google account", async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(async () => await result.current.googleSignIn());
    await waitForNextUpdate();

    console.log('USER PROFILE NOT =>', result.current.user);

    expect(result.current.user).not.toHaveProperty('id');
  });
})
