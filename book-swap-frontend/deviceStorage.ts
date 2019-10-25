import { AsyncStorage } from 'react-native';

const deviceStorage = {
    async saveItem(key: string, value: any) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async getItem(key: string) {
        try {
            return await AsyncStorage.getItem(key)
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async clear() {
        try {
            await AsyncStorage.clear()
        } catch(error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }
};

export default deviceStorage;