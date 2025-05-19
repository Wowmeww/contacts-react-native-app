import AsyncStorage from "@react-native-async-storage/async-storage";

async function storeUser(user) {
    try {
        const users = getUsers()? await getUsers() : [];
        const userExists = users.find((u) => u.email === user.email);
        if(userExists) {
            alert("User already exists");
            return false;
        }
        users.push(user);
        await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error('Error storing user:', error);
    } 
    return true;
}

async function  getUsers() {
    try {
        const users = await AsyncStorage.getItem('users');
        return users ? JSON.parse(users) : [];
            
    } catch (error) {
        console.error('Error retrieving users:', error);
        return [];
    }
}

async function clearUsers() {
    try {
        await AsyncStorage.removeItem('users');
        logoutUser();
    } catch (error) {
        console.error('Error clearing users:', error);
    }
}

async function setLoggedInUser(user) {
    try {
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
    } catch (error) {
        console.error('Error setting logged in user:', error);
    }
}

async function getLoggedInUser() {
    try {
        const user = await AsyncStorage.getItem('loggedInUser');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error retrieving logged in user:', error);
        return null;
    }
}

async function logoutUser() {
    try {
        await AsyncStorage.removeItem('loggedInUser');
    } catch (error) {
        console.error('Error logging out user:', error);
    }
}


export { clearUsers, getLoggedInUser, getUsers, logoutUser, setLoggedInUser, storeUser };

