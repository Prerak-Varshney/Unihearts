import { useEffect, useState, useRef } from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import { View, Text, ScrollView, TextInput, Keyboard, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { socket } from '@/utils/socket';
import axios from 'axios';

export default function ChatScreen() {
  const { email, chatId, currentUserId, otherUserId, otherUserProfilePic, otherUserFullName, otherUserEmail } = useLocalSearchParams();
  // const [messages, setMessages] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ text: string; senderId: string }[]>([]);

  const [recievedMessages, setRecievedMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const scrollViewRef = useRef<ScrollView | null>(null);

  const getMessageHistory = async (chatId: string) => {
    const getAllMessages = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/chats/get-chat`, {chatId});

    try{
      if(getAllMessages.data.success){
        setMessages(getAllMessages.data.messages);
      }

    }catch(error:any){
      if(error.getAllMessages){
        console.log("error here", error)

      }else{
        console.log("client error here", error)
      }
    }
  }

  useEffect(() => {

    socket.connect();
    socket.emit('joinChat', chatId);

    getMessageHistory(chatId);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [chatId]);

  useEffect(() => {
    for(let i = 0; i < 2; ++i){
      console.log('\n');
    }
    messages.map(message => console.log(message));
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    const trimmedText = text.trim();
    if(trimmedText){
      const message = { chatId, text: trimmedText, senderId: currentUserId };
      socket.emit('sendMessage', message);
      setInput('');
    }
  };

  const openMatchProfile = () => {
      router.push({
        pathname: './matchesProfile',
        params: {matchProfileEmail: otherUserEmail, email: email}
      })
  }

  return (
    <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <SafeAreaView className='w-full h-full bg-white'>
        <StatusBar style='dark'/>

        <TouchableOpacity className={`w-full h-16 border-b border-b-gray-300 flex flex-row justify-start items-center mb-1 pl-6`} onPress={openMatchProfile}>
            <View className='h-full w-auto flex justify-center items-center mr-6'>
                <Image source={{ uri: otherUserProfilePic }} className='w-14 h-14 rounded-full' />
            </View>
            <View className={`flex-1 h-full flex flex-row justify-start items-center`}>
                <Text className='text-black text-base font-semibold'>{otherUserFullName}</Text>
            </View>
        </TouchableOpacity>

        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}
          ref={scrollViewRef} 
          >
          
          <View 
            className='w-full h-full flex justify-end items-center'
            >
            {messages.length > 0 && messages.map((message, index) => (
              <TouchableOpacity
              className={`!w-auto min-h-[40px] rounded-3xl ${message.senderId === currentUserId ? 'self-end mr-4' : 'self-start ml-4'} mb-4`}
              delayLongPress={500}
              onLongPress={() => {return}}
              key={index}
              >
                <LinearGradient
                  colors={message.senderId === currentUserId ? ['#00c6ff', '#0072ff'] : ['#FF7E5F', '#FF6F20']}
                  className={`!w-auto min-h-[40px] rounded-3xl flex flex-row justify-center items-center px-4 py-2`}
                >
                  <View className='max-w-[250px]'>
                    <Text className='text-white text-base font-semibold max-w-[250px]'>{message.text}</Text>
                  </View>
                  <View className='flex items-center self-end ml-4'>
                    <Text className='text-gray-300 text-xs font-normal'>{message.timestamp}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View className='w-full min-h-[64px] flex flex-row justify-center items-center border-t border-t-gray-300'>
            <View className='w-4/5 min-h-[40px] bg-gray-300 rounded-3xl text-black font-semibold flex flex-row justify-between items-center'>
                <TextInput
                    className={`w-5/6 min-h-[32px] bg-gray-300 pl-4 rounded-3xl text-black font-semibold py-2 ${Platform.OS === "ios" && 'pt-2'}`}
                    placeholder="Message..."
                    placeholderTextColor="#666"
                    multiline={true}
                    textAlignVertical="center"
                    editable={true}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    cursorColor={'black'}
                />

                <TouchableOpacity className='w-10 h-10 bg-black rounded-full flex justify-center items-center' onPress={() => sendMessage(input)}>
                    <Text className='text-white text-base font-bold'>&#770;v &#770;</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}