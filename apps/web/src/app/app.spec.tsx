import { render } from '@testing-library/react';
import User from './user.home';

describe('User', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<User />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<User />);
    expect(getByText(/Welcome web/gi)).toBeTruthy();
  });
});
