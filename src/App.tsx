import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import CelebrationScreen from './screens/CelebrationScreen';
import CollectionScreen from './screens/CollectionScreen';

type View =
  | { name: 'home' }
  | { name: 'quiz'; categoryId: string }
  | { name: 'celebrate'; categoryId: string }
  | { name: 'collection' };

function App() {
  const [view, setView] = useState<View>({ name: 'home' });

  if (view.name === 'home') {
    return (
      <HomeScreen
        onPickCategory={(categoryId) => setView({ name: 'quiz', categoryId })}
        onCollection={() => setView({ name: 'collection' })}
      />
    );
  }

  if (view.name === 'quiz') {
    return (
      <QuizScreen
        categoryId={view.categoryId}
        onFinish={(categoryId) => setView({ name: 'celebrate', categoryId })}
        onHome={() => setView({ name: 'home' })}
      />
    );
  }

  if (view.name === 'celebrate') {
    return (
      <CelebrationScreen
        categoryId={view.categoryId}
        onHome={() => setView({ name: 'home' })}
        onCollection={() => setView({ name: 'collection' })}
      />
    );
  }

  return <CollectionScreen onHome={() => setView({ name: 'home' })} />;
}

export default App;
