import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import SitePickerScreen from './screens/SitePickerScreen';
import DigQuizScreen from './screens/DigQuizScreen';
import SiteCompleteScreen from './screens/SiteCompleteScreen';
import CelebrationScreen from './screens/CelebrationScreen';
import CollectionScreen from './screens/CollectionScreen';

type View =
  | { name: 'home' }
  | { name: 'sitePicker'; categoryId: string }
  | { name: 'quiz'; siteId: string; chain: string[] }
  | { name: 'siteComplete'; siteId: string; chain: string[] }
  | { name: 'celebrate'; chain: string[] }
  | { name: 'collection' };

function App() {
  const [view, setView] = useState<View>({ name: 'home' });

  switch (view.name) {
    case 'home':
      return (
        <HomeScreen
          onPickCategory={(categoryId) => setView({ name: 'sitePicker', categoryId })}
          onCollection={() => setView({ name: 'collection' })}
        />
      );

    case 'sitePicker':
      return (
        <SitePickerScreen
          categoryId={view.categoryId}
          onPickSite={(siteId) => setView({ name: 'quiz', siteId, chain: [] })}
          onHome={() => setView({ name: 'home' })}
        />
      );

    case 'quiz':
      return (
        <DigQuizScreen
          siteId={view.siteId}
          chain={view.chain}
          onSiteComplete={(siteId, chain) => setView({ name: 'siteComplete', siteId, chain })}
          onHome={() => setView({ name: 'home' })}
        />
      );

    case 'siteComplete':
      return (
        <SiteCompleteScreen
          siteId={view.siteId}
          chain={view.chain}
          onDigDeeper={(nextSiteId) => setView({ name: 'quiz', siteId: nextSiteId, chain: view.chain })}
          onStop={() => setView({ name: 'celebrate', chain: view.chain })}
          onHome={() => setView({ name: 'home' })}
        />
      );

    case 'celebrate':
      return (
        <CelebrationScreen
          chain={view.chain}
          onHome={() => setView({ name: 'home' })}
          onCollection={() => setView({ name: 'collection' })}
        />
      );

    case 'collection':
      return <CollectionScreen onHome={() => setView({ name: 'home' })} />;
  }
}

export default App;
