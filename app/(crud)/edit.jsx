import AvatarSelector from '@/components/myComponents/avatarSelector';
import { updateContact } from '@/localstorage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function Edit() {
    const { selectedContact } = useLocalSearchParams();
    const contact = JSON.parse(selectedContact);
    const router = useRouter();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [avatar, setAvatar] = useState(contact.avatar);

    const handleAvatarSelect = (img) => {
        setAvatar(img);
    }


    useEffect(() => {
        setName(contact.name);
        setNumber(contact.number);
        setAvatar(contact.avatar);
    }, [])

    const handleUpdateContact = () => {
        if (name === '' || number === '') {
            alert('Fill up all fields');
        }
        else {
            const contact = JSON.parse(selectedContact);
            updateContact(contact.index, { name, number, avatar }).then(() => {
                router.push('/(tabs)');
            });
        }

    };

    return (
        <View style={styles.form}>
            <Text style={styles.formTitle}>Edit contact</Text>

            <AvatarSelector onSelect={handleAvatarSelect} defaultAvatar={avatar} />

            <View style={styles.textInputContainer}>

                <TextInput
                    placeholderTextColor="gray"
                    onChange={(e) => setName(e.nativeEvent.text)}
                    value={name}
                    style={{
                        height: 50,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 8,
                        marginBottom: 16,
                        paddingHorizontal: 10,
                        color: '#000'
                    }}
                    placeholder="Name"
                />
                <TextInput
                    placeholderTextColor="gray"
                    onChange={(e) => setNumber(e.nativeEvent.text)}
                    value={number}
                    autoCapitalize="none"
                    style={{
                        height: 50,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 8,
                        marginBottom: 16,
                        paddingHorizontal: 10,
                        color: '#000'
                    }}
                    placeholder="Number"
                    keyboardType="numeric"
                />

            </View>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#007BFF',
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginBottom: 16,
                    }}
                    onPress={() => {
                        handleUpdateContact();
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Update contact</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        router.push('(tabs)');
                    }}
                >
                    <Text style={{ color: '#007BFF', fontSize: 16, fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16
    },
    container: {
        gap: 75,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formTitle: {
        fontSize: 40,
        fontWeight: 'semibold',
        marginBottom: 20,
    },
    textInputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    buttons: {
        width: '100%',
        marginBottom: 40,
    },
});