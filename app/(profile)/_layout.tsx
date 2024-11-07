import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }}/>
      <Stack.Screen name="gender" options={{ headerShown: false  }}/>
      <Stack.Screen name="quote" options={{ headerShown: false  }}/>
      <Stack.Screen name="height" options={{ headerShown: false  }}/>
      <Stack.Screen name="course" options={{ headerShown: false  }}/>
      <Stack.Screen name="narcotics" options={{ headerShown: false  }}/>
      <Stack.Screen name="selectImage" options={{ headerShown: false  }}/>
      <Stack.Screen name="choosePrompts" options={{ headerShown: false  }}/>
      <Stack.Screen name="writePrompts" options={{ headerShown: false  }}/>
    </Stack>
  );
}
