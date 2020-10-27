import AsyncStorage from '@react-native-async-storage/async-storage';

class Database {
    _storeData = async (data, key) => {
        try {
          await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
        } catch (error) {
          // Error saving data
        }
      };
      _retrieveData = async (data, key) => {
        try {
          const value = await AsyncStorage.getItem('TASKS');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
}
