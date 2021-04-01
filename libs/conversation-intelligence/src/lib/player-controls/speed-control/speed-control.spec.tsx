import React from 'react';
import { render } from '@testing-library/react';

import SpeedControl from './speed-control';

describe('SpeedControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpeedControl />);
    expect(baseElement).toBeTruthy();
  });
});
