import React from 'react';
import { render } from '@testing-library/react';

import ConversationSummary from './conversation-summary';

describe('ConversationSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConversationSummary />);
    expect(baseElement).toBeTruthy();
  });
});
