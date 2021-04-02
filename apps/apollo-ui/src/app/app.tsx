import React, { useEffect, useState } from 'react';

import {
  ConversationIntelligence,
  transcriptService,
  Transcript,
} from '@apollo/conversation-intelligence';

export function App() {
  const transcriptId = 'transcript-1';
  const [transcript, setTranscript] = useState<Transcript>();
  useEffect(() => {
    transcriptService.getTranscript(transcriptId).then((fetchedTranscript) => {
      setTranscript(fetchedTranscript);
    });
  }, []);
  return (
    <div>
      <ConversationIntelligence
        transcript={{
          data: transcript,
          id: transcriptId,
        }}
      ></ConversationIntelligence>
    </div>
  );
}

export default App;
