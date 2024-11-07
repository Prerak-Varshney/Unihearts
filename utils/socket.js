import {io} from 'socket.io-client';

const URL = `${process.env.EXPO_PUBLIC_SOCKET_URL}`;

export const socket = io(URL, {
    transports: ['websocket'],
    autoConnect: false,
})