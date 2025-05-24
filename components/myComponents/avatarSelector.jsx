import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { avatarsSource } from '@/localstorage';

export default function AvatarSelector({ onSelect, defaultAvatar }) {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar? defaultAvatar:avatarsSource[4]);


    const toggleOptions = () => setShowOptions(!showOptions);
    const handelSelect = (img) => {
        setSelectedAvatar(img);
        onSelect(img);
        toggleOptions();
    }

    return (
        <>
            <TouchableOpacity onPress={toggleOptions} >
                <Image source={selectedAvatar.source} style={styles.image} />
            </TouchableOpacity>

            {showOptions && <View style={styles.overlay}  >
                <View style={styles.container}>
                    {
                        avatarsSource.map((img) => (
                            <TouchableOpacity key={img.name} onPress={()=> handelSelect(img)} >
                                <Image source={img.source} style={styles.availableAvatar} />
                            </TouchableOpacity>
                        ))
                    }
                    <TouchableOpacity style={styles.cancelButton} onPress={toggleOptions}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>


            </View>}
        </>
    );
}

const styles = StyleSheet.create({
    image: { width: 200, height: 200, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderColor: '#007BFF', borderWidth: 2, marginBottom: 20 },
    overlay: {
        position: 'absolute',
        backgroundColor: '#00000070',
        minWidth: '100vw',
        minHeight: '100vh',
        zIndex: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        position: 'relative',
        backgroundColor: '#007BFF',
        flexDirection: 'row',
        minWidth: 300,
        maxWidth: 340,
        padding: 16,
        borderRadius: 8,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 40
    },
    availableAvatar:
        { width: 50, height: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderColor: '#007BFF', borderWidth: 2, marginBottom: 20 },
    cancelButton: {
        position: 'absolute',
        bottom: 16,
        borderWidth: 2,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderColor: '#fff',
        borderRadius: 6
    },
    buttonText: {
        color: '#fff'
    }

});