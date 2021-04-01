import React from 'react';
import { render } from '@testing-library/react';

import ConversationIntelligence from './conversation-intelligence';

describe('ConversationIntelligence', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConversationIntelligence />);
    expect(baseElement).toBeTruthy();
  });
});
