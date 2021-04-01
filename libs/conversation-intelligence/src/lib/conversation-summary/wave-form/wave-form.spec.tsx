import React from 'react';
import { render } from '@testing-library/react';

import WaveForm from './wave-form';

describe('WaveForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WaveForm />);
    expect(baseElement).toBeTruthy();
  });
});
