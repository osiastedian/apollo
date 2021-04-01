import React from 'react';
import { render } from '@testing-library/react';

import TranscriptDetails from './transcript-details';

describe('TranscriptDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TranscriptDetails />);
    expect(baseElement).toBeTruthy();
  });
});
