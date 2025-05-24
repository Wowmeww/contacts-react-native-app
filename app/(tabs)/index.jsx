import ContactItem from '@/components/myComponents/ContactItem';
import ContactOptions from '@/components/myComponents/contactOptions';
import { deleteContact, getLoggedInUser, toggleFavoriteContact } from '@/localstorage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';


export default function HomeScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [contacts, setContacts] = useState([]);

    const [optionsShowing, setOptionsShowing] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const handelSelectContact = (contact, index) => {
        setSelectedContact({ ...contact, index });
        setOptionsShowing(true);
    }

    const handelDelete = () => {
        deleteContact(selectedContact.index).then(() => {
            setOptionsShowing(false);
        })
    }
    const handleEdit = () => {
        router.push({
            pathname: '/edit',
            params: {
                selectedContact: JSON.stringify(selectedContact)
            },
        })
    }

    // seedDatabase();

    // Reload user and contacts when screen is focused
    useFocusEffect(
        useCallback(() => {
            getLoggedInUser().then(u => {
                if (u) {
                    setUser(u);
                    setContacts(u.contacts || []);
                } else {
                    router.push('/');
                }
            });
        }, [navigation, optionsShowing, router])
    );
    async function handleToggleFavorite(index) {
        if (!user) return;
        const success = await toggleFavoriteContact(index);
        if (success) {
            const updatedUser = await getLoggedInUser();
            setUser(updatedUser);
            setContacts(updatedUser?.contacts || []);
        }
    }
    return (

        <View style={{ flex: 1, position: 'relative' }}>
            {optionsShowing && <ContactOptions onCancel={() => setOptionsShowing(false)} onDelete={handelDelete} onEdit={handleEdit} />}
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
                {
                    (contacts || []).map((contact, index) => (
                        <ContactItem
                            onSelected={() => handelSelectContact(contact, index)}

                            key={index}
                            contact={contact}
                            index={index}
                            onToggleFavorite={() => handleToggleFavorite(index)}
                        />
                    ))
                }
            </ScrollView>

            <TouchableOpacity
                onPress={() => router.push('/addContact')}
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 20,
                    zIndex: 10,
                }}
            >
                <Ionicons name="add-circle-outline" size={60} color="#007BFF" />
            </TouchableOpacity>

        </View>
    );
}
