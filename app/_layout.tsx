// TODO - this is possibly to remove
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'index' }} />
      <Stack.Screen name="add-scene" options={{ title: 'add scene' }} />
    </Stack>
  );
}
