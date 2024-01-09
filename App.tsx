import * as React from 'react';
import Root from './src/route';
import Toast from 'react-native-toast-message';

const App = (): JSX.Element => {
  return (
    <>
      <Root />
      <Toast />
    </>
  );
}

export default App;