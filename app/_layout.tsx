import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Scenes' }} />
      <Stack.Screen name="AddSceneForm/AddSceneForm" options={{ title: 'Add scene' }} />
    </Stack>
  );
}
