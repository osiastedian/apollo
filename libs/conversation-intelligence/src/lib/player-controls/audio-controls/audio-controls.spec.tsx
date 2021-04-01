import React from 'react';
import { render } from '@testing-library/react';

import AudioControls from './audio-controls';

describe('AudioControls', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AudioControls />);
    expect(baseElement).toBeTruthy();
  });
});
