import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="editProfile" options={{ headerShown: false  }}/>
      <Stack.Screen name="editPrompts" options={{ headerShown: false  }}/>
      <Stack.Screen name="editImages" options={{ headerShown: false  }}/>
      <Stack.Screen name="editProfileDetails" options={{ headerShown: false  }}/>
      <Stack.Screen name="editHeight" options={{ headerShown: false  }}/>
      <Stack.Screen name="editOrientation" options={{ headerShown: false  }}/>
      <Stack.Screen name="editVices" options={{ headerShown: false  }}/> 
    </Stack>
  );
}
