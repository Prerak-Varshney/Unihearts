import { Redirect } from 'expo-router';

export default function HomeScreen() {
  // return <Redirect href="/(auth)/welcome"/>;
  return <Redirect href="/(main)/myProfile"/>;
  // return <Redirect href="/(profile)/choosePrompts"/>;
}
