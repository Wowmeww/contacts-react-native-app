import AsyncStorage from '@react-native-async-storage/async-storage';

/*
AsyncStorage keys
    users: [
            {
                name: '', email: '', password: '',
                contacts: [{name: '', number: '', favorite: false}]    
            }
        ]
    signedUser: {
                    {
                        name: '', email: '', password: '',
                        contacts: [{name: '', number: '', favorite: false}]
                    }
    }

*/

const avatarsSource = [
    { name: '1', source: require('@/assets/images/mine/avatars/avatar_1.jpg') },
    { name: '2', source: require('@/assets/images/mine/avatars/avatar_2.jpg') },
    { name: '3', source: require('@/assets/images/mine/avatars/avatar_3.jpg') },
    { name: '4', source: require('@/assets/images/mine/avatars/avatar_4.jpg') },
    { name: '5', source: require('@/assets/images/mine/avatars/avatar_5.jpg') },
    { name: '6', source: require('@/assets/images/mine/avatars/avatar_6.jpg') },
    { name: '7', source: require('@/assets/images/mine/avatars/avatar_7.jpg') },
];

async function registerUser(newUser) {
    try {
        const user = { ...newUser, contacts: newUser.contacts || [] };
        const users = await getUsers();
        const userExists = users.some(u => u.email === user.email);
        if (userExists) {
            throw new Error('User already exists');
        }
        if (newUser.password > 6) {
            throw new Error('Password need to be at least 6 character long.');
        }
        users.push(user);
        console.dir(users);
        await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (e) {
        alert(e);
    }
}
async function getUsers() {
    try {
        const users = await AsyncStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (e) {
        console.log(e);
        return [];
    }
}

async function getLoggedInUser() {
    try {
        const userString = await AsyncStorage.getItem('signedUser');
        const signedUser = userString ? JSON.parse(userString) : null;

        if (!signedUser) return null;

        const users = await getUsers();
        const matchedUser = users.find(u => u.email === signedUser.email);

        return matchedUser || null;
    } catch (e) {
        console.log('Error reading user:', e);
        return null;
    }

}

async function clearDatabase() {
    try {
        await AsyncStorage.clear();
        console.log(await getUsers());
    } catch (e) {
        console.log(e);
    }
}
async function setLoggedInUser(user) {
    try {
        await AsyncStorage.setItem('signedUser', JSON.stringify(user));
        return true;
    } catch (e) {
        console.log('Failed to sign in user:', e);
        return false;
    }
}
async function seedDatabase() {
    try {
        // Clear existing data
        await AsyncStorage.clear();

        await registerUser({
            name: 'Nico',
            email: 'nicobernardfirmanes@gmail.com',
            password: '1111',
            contacts: [
                {
                    name: 'John Dow',
                    number: 13242423,
                    favorite: false
                },
                {
                    name: 'John Dow II',
                    number: 76807586,
                    favorite: false
                },
            ]
        });
        return true;
    } catch (e) {
        console.log('Failed to seed database:', e);
        return false;
    }
}

async function addContact(contact) {
    try {
        const user = await getLoggedInUser();
        if (!user) throw new Error('No user is logged in');
        const isDuplicate = user.contacts.some(c => c.name === contact.name && c.number === contact.number);
        if (isDuplicate) {
            throw new Error('Contact already exists');
        }
        user.contacts.push(contact);

        // Update the full users list
        const users = await getUsers();
        const updatedUsers = users.map(u => u.email === user.email ? user : u);

        // Save updates
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        await setLoggedInUser(user);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
async function updateContact(index, updatedContact) {
    try {
        const user = await getLoggedInUser();
        if (!user) throw new Error('No user is logged in');

        if (index < 0 || index >= user.contacts.length) {
            throw new Error('Invalid contact index');
        }

        user.contacts[index] = updatedContact;

        const users = await getUsers();
        const updatedUsers = users.map(u => u.email === user.email ? user : u);

        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        await setLoggedInUser(user);

        return true;
    } catch (e) {
        console.log('Failed to update contact:', e);
        return false;
    }
}

async function deleteContact(index) {
    try {
        const user = await getLoggedInUser();
        if (!user) throw new Error('No user is logged in');

        if (index < 0 || index >= user.contacts.length) {
            throw new Error('Invalid contact index');
        }

        user.contacts.splice(index, 1);

        const users = await getUsers();
        const updatedUsers = users.map(u => u.email === user.email ? user : u);

        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        await setLoggedInUser(user);

        return true;
    } catch (e) {
        console.log('Failed to delete contact:', e);
        return false;
    }
}

async function toggleFavoriteContact(index) {
    try {
        const user = await getLoggedInUser();
        if (!user) throw new Error('No user is logged in');

        if (index < 0 || index >= user.contacts.length) {
            throw new Error('Invalid contact index');
        }

        // Toggle favorite value
        user.contacts[index].favorite = !user.contacts[index].favorite;

        // Update storage
        const users = await getUsers();
        const updatedUsers = users.map(u => u.email === user.email ? user : u);

        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        await setLoggedInUser(user);

        return true;
    } catch (e) {
        console.log('Failed to toggle favorite:', e);
        return false;
    }
}

async function loginUser(email, password) {
    try {
        if (!email || !password) {
            alert('Please enter both email and password');
            return { success: false, message: 'Missing credentials' };
        }

        const users = await getUsers();
        console.log('All users:', users); // Debugging

        const matchedUser = users.find(u => u.email === email && u.password === password);

        if (matchedUser) {
            await setLoggedInUser(matchedUser);
            return { success: true, user: matchedUser };
        } else {
            alert('Invalid email or password');
            return { success: false, message: 'Invalid email or password' };
        }
    } catch (e) {
        console.log('Login error:', e);
        return { success: false, message: 'Something went wrong during login' };
    }
}




export {
    addContact, avatarsSource, clearDatabase,
    deleteContact,
    getLoggedInUser,
    getUsers, loginUser, registerUser,
    seedDatabase,
    setLoggedInUser,
    toggleFavoriteContact,
    updateContact
};

