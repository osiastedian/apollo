import React from 'react';
import { render } from '@testing-library/react';

import TranscriptEntry from './transcript-entry';

describe('TranscriptEntry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TranscriptEntry />);
    expect(baseElement).toBeTruthy();
  });
});
