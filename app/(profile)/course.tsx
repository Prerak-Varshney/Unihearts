import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { useState } from "react";
import { SelectCountry } from 'react-native-element-dropdown';

import { courseData, yearData } from '@/constants/course';

import { postCourseDetails } from "@/api/userDetails";

const course = () => {
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');


    const { email } = useLocalSearchParams(); 
    const courseConfirm = async() => {
        console.log(year, course)
        const response = await postCourseDetails(email, course, year);
        if(!response.success){
            return response.message;
        }
        router.replace({
            pathname: './height',
            params: { email },
        });
        console.log(response);
    }

    return(
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
            <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black text-center">Your course at Bennett University?</Text>

            <View className="w-full h-1/4 flex flex-col justify-evenly items-center">
            <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                containerStyle={styles.containerStyle}
                maxHeight={200}
                value={course}
                data={courseData}
                valueField="value"
                labelField="lable"
                imageField="image"
                placeholder="Course"
                onChange={e => {
                    setCourse(e.value);
                }}
            />

            <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                containerStyle={styles.containerStyle}
                maxHeight={200}
                value={year}
                data={yearData}
                valueField="value"
                labelField="lable"
                imageField="image"
                placeholder="Year"
                onChange={e => {
                    setYear(e.value);
                }}
            />
            </View>

             <View className="w-full justify-end items-center flex flex-col">
                <TouchableOpacity className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center' onPress={() => {courseConfirm()}}>
                    <Text className='text-white font-semibold text-sm'>Confirm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default course;

const styles = StyleSheet.create({
    dropdown: {
      display: 'flex', 
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: 48,
      width: '80%',
      backgroundColor: '#EEEEEE',
      borderRadius: 16,
      paddingHorizontal: 16,
    },

    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    containerStyle: {
        borderRadius: 16,
    }
  });
