import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ContactOptions = ({
    onCancel,
    onEdit,
    onDelete
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <Text style={styles.modalHeader}>Options</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#FFDF00' }} onPress={onEdit}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#FF0000' }} onPress={onDelete}>
                        <Text style={{...styles.buttonText, color: '#fff'}}>Delete</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#00000070',
        zIndex: 40
    },
    modal: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 40,
        minWidth: 300,
        maxWidth: 340
    },
    modalHeader: {
        fontWeight: 800,
        fontSize: 30,
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    button: {
        borderWidth: 1,
        borderRadius: 6,
        paddingVertical: 3,
        paddingHorizontal: 6
    }
});

export default ContactOptions;