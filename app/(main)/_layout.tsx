import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false  }}/>
      <Stack.Screen name="myProfile" options={{ headerShown: false  }}/>
      <Stack.Screen name="chats" options={{ headerShown: false  }}/>
      <Stack.Screen name="chatScreen" options={{ headerShown: false  }}/>
      <Stack.Screen name="matches" options={{ headerShown: false  }}/>
      <Stack.Screen name="payment" options={{ headerShown: false  }}/>
      <Stack.Screen name="likedYouProfileVisit" options={{ headerShown: false  }}/>
      <Stack.Screen name="matchesProfile" options={{ headerShown: false  }}/>
      <Stack.Screen name="noNetworkPage" options={{ headerShown: false  }}/>
    </Stack>
  );
}
