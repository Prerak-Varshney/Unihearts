import { useState, useEffect } from 'react';
import { Redirect, router } from 'expo-router';
// import * as Network from 'expo-network';
// import NoNetwork from './(main)/noNetworkPage';
export default function HomeScreen() {
  // const [isOnline, setIsOnline] = useState<boolean>(true);

  //   useEffect(() => {
  //       NetworkState();


  //       if(isOnline){
  //           router.back();
  //       }

  //   }, [isOnline]);
  //   const NetworkState = async() => {
  //       const networkState = await Network.getNetworkStateAsync();
  //       console.log(`Current network type: ${networkState.type}`);
  //       console.log(`Is connected: ${networkState.isConnected}`);
  //       setIsOnline(networkState.isConnected);
  //   } 

  // return <Redirect href="/(auth)/welcome"/>;
  return <Redirect href="/(auth)/welcome"/>;
  // return <Redirect href="/(edit)/editProfile"/>;
  // return <Redirect href="/(profile)/choosePrompts"/>;
}
