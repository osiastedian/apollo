import React from 'react';
import { render } from '@testing-library/react';

import TimeInfo from './time-info';

describe('TimeInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TimeInfo />);
    expect(baseElement).toBeTruthy();
  });
});
