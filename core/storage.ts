import { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = (key: string) => {
    const [value, setValue] = useState<string | undefined | null>();

    const getItem = async () => {
        const value = await AsyncStorage.getItem(key);
        setValue(value)
    }

    const setItem = async (newValue: string) => {
        await AsyncStorage.setItem(key, newValue);
        setValue(newValue)
    }
    
    useEffect(() => {
        getItem()
    }, [])

    return [value, setItem] as const
}
