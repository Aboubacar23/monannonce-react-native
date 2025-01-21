import AsyncStorage from "@react-native-async-storage/async-storage";
import {showMessage} from "react-native-flash-message";


const API_URL= process.env.EXPO_PUBLIC_API_URL;
export async function fetchData(path: string, method: string, body?: Object, useToken?: boolean){
    try {
        const token = await AsyncStorage.getItem('token');
        let headers = {
            Accept: 'application/json',
            'Context-Type': 'application/json',
        }
        if (token)
        {
            headers = {
                ...headers,
               // Authorization: 'Bearer'+token
            };
        }

        fetch(API_URL + path, {
            method,
            headers,
            body: JSON.stringify(body),
        }).then(response =>{
            return response.json()
        }).catch(error => {
            error = JSON.parse(error);
            console.log(error.message);
            showMessage({
                message: 'Erreur',
                description: error.message,
                type: 'danger',
                icon: 'danger'
            })
        })
    }catch (e: any) {
        console.error(e)
        const error = JSON.parse(e);
        showMessage({
            message: 'Erreur',
            description: error.message,
            type: 'danger',
            icon: 'danger',
        });
        return error;
    }
}
