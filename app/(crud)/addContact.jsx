import AvatarSelector from "@/components/myComponents/avatarSelector";
import { addContact } from "@/localstorage";
import { useRouter } from 'expo-router';
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function AddContact() {


    const router = useRouter();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [avatar, setAvatar] = useState('');


    const handleAvatarSelect = (img) => {
        setAvatar(img);
    }

    const handleAddContact = () => {
        if (name === '' || number === '') {
            alert('Fill up all fields');
        }
        else {

            addContact({ name, number, avatar }).then(() =>
                router.push('(tabs)')
            );
        }

    };

    return (
        <View style={styles.form}>
            <Text style={styles.formTitle}>Add contact</Text>

            {/* Avatar */}
            <AvatarSelector onSelect={handleAvatarSelect} />

            <View style={styles.textInputContainer}>

                <TextInput
                    onChange={(e) => setName(e.nativeEvent.text)}
                    value={name}
                    style={{
                        height: 50,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 8,
                        marginBottom: 16,
                        paddingHorizontal: 10,
                    }}
                    placeholder="Name"
                />
                <TextInput
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
                        handleAddContact();
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Add contact</Text>
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