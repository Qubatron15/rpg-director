import { Stack } from "expo-router";
import { store } from './store/store';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Scenes' }} />
          <Stack.Screen name="AddSceneForm/AddSceneForm" options={{ title: 'Add/Edit scene' }} />
        </Stack>
      </PaperProvider >
    </Provider >
  );
}
