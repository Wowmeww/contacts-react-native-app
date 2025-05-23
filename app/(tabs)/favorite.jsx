import ContactItem from '@/components/myComponents/ContactItem';
import { getLoggedInUser, toggleFavoriteContact } from '@/localstorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Favorite() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [contacts, setContacts] = useState([]);

    useFocusEffect(
        useCallback(() => {
            getLoggedInUser().then(u => {
                if (!u) navigation.navigate('index');
                else {
                    setUser(u);
                    setContacts(u.contacts || []);
                }
            });
        }, [])
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

    const favoriteContacts = contacts.filter(c => c.favorite);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
                {favoriteContacts.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        No favorite contacts yet.
                    </Text>
                ) : (
                    favoriteContacts.map(contact => {
                        const originalIndex = contacts.findIndex(
                            c => c.email === contact.email && c.number === contact.number
                        );
                        return (
                            <ContactItem
                                key={originalIndex}
                                contact={contact}
                                index={originalIndex}
                                onToggleFavorite={() => handleToggleFavorite(originalIndex)}
                            />
                        );
                    })
                )}
            </ScrollView>
            {/* ...rest of your code */}
        </View>
    );

}
