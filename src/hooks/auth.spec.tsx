import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

describe('Auth Hook', () => {
  it('Should be able to sign in with an existing Google account', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.googleSignIn());

    expect(result.current.googleSignIn).toBeTruthy();
  });
})
