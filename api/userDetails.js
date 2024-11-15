import axios from 'axios';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/user-details`;

export const postGenderDetails = async (email, gender, genderPreference) => {
    try{
        const response = await axios.post(`${API_URL}/add-gender`, {email, gender, genderPreference});
        return response.data;

    }catch (error){
        if(error.response) {
            console.log("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.log("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }
}

export const postProfileDetails = async (email, firstName, lastName, birthday) => {
    try{
        const response = await axios.post(`${API_URL}/add-profile`, {email, firstName, lastName, birthday});
        console.log("successfully sent profile details");
        return response.data;

    }catch (error){
        if(error.response) {
            console.log("Error while uploading profile details:", error.response.data.message);
            return error.response.data;
        }else{
            console.log("Error:", error.message);
            return { success: false, message: "An unknown error occurred in profile" };
        }
    }
}

export const postCourseDetails = async (email, course, year) => {
    try{
        const response = await axios.post(`${API_URL}/add-course`, {email, course, year});
        return response.data;

    }catch (error){
        if(error.response) {
            console.log("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.log("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }
}

export const postHeightDetails = async (email, height) => {
    try{
        const response = await axios.post(`${API_URL}/add-height`, {email, height});
        return response.data;

    }catch (error){
        if(error.response) {
            console.log("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.log("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }
}

export const postNarcoticsDetails = async (email, isSmokeVisible, isDrinkVisible, isWeedVisible, isSmoke, isDrink, isWeed) => {
    try{
        const response = await axios.post(`${API_URL}/add-narcotics`, {email, isSmokeVisible, isDrinkVisible, isWeedVisible, isSmoke, isDrink, isWeed});
        return response.data;

    }catch (error){
        if(error.response) {
            console.log("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.log("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }
}

export const postPromptsDetails = async (
    email,
    prompt1,
    prompt2,
    prompt3,
    answer1,
    answer2,
    answer3
) => {
    try{
        const response = await axios.post(`${API_URL}/add-prompts`, {
            email,
            prompt1,
            prompt2,
            prompt3,
            answer1,
            answer2,
            answer3
        });
        return response.data;

    }catch (error){
        if(error.response) {
            console.log("Error:", error.response.data.message);
            return error.response.data;
        }else{
            console.log("Error:", error.message);
            return { success: false, message: "An unknown error occurred" };
        }
    }
}