import axios from 'axios';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/auth`;

export const signup = async (email) => {
    try{
        const response = await axios.post(`${API_URL}/signup`, {email});
        return response.data;

    }catch (error){
        if(error.response) {
            console.error("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.error("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }

}

export const verifyEmail = async (email, otp) => {
    try{
        const response = await axios.post(`${API_URL}/verify-email`, {otp});
        return response.data;

    }catch (error){
        if(error.response) {
            console.error("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.error("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }
}

export const signin = async (email) => {
    try{
        const response = await axios.post(`${API_URL}/signin`, {email});
        return response.data;

    }catch (error){
        if(error.response) {
            console.error("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.error("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }
}

export const verifySignin = async (email, otp) => {
    try{
        const response = await axios.post(`${API_URL}/verify-signin`, {otp});
        return response.data;

    }catch (error){
        if(error.response) {
            console.error("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.error("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }
}

export const resendOtp = async (email, forSignInOrSignUp) => {
    try{
        const response = await axios.post(`${API_URL}/resend-otp`, {email, forSignInOrSignUp});
        return response.data;

    }catch (error){
        if(error.response) {
            console.error("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.error("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }
}
