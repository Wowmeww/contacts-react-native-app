
import phoneIcon from '@/assets/images/mine/phoneIcon.png';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { getLoggedInUser, registerUser } from '@/localstorage';
import { useEffect, useState } from 'react';


function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    getLoggedInUser().then(user => {
        if (user) navigation.navigate('(tabs)');
    });


    useEffect(() => {
        // clearDatabase();

    }, [])

    const handleSignUp = () => {
        let emptyFields = !email || !name || !password || !confirmPassword;
        let passwordNotMatch = password !== confirmPassword;
        let invalidEMail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (emptyFields) {
            alert('Please fill-up all the text fields.');
        }
        if (passwordNotMatch) {
            alert('Password not match.');
        }
        if (invalidEMail) {
            alert('Not a valid Email');
        }
        if (!emptyFields && !passwordNotMatch && !invalidEMail) {
            const newUser = { name, password, email };
            registerUser(newUser).then(() => {
                setEmail('');
                setName('');
                setPassword('');
                setConfirmPassword('');

                navigateToSignIn();
            });
        }
    }
    const navigateToSignIn = () => {
        navigation.navigate('index');
    }
    // Password strength calculation function
    const getPasswordStrength = (pwd) => {
        if (!pwd) return '';
        if (pwd.length < 6) return 'Weak';
        if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.match(/[^A-Za-z0-9]/) && pwd.length >= 8) {
            return 'Strong';
        }
        if ((pwd.match(/[A-Z]/) || pwd.match(/[0-9]/)) && pwd.length >= 6) {
            return 'Medium';
        }
        return 'Weak';
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.screen}>
            <View style={styles.container}>
                <Image
                    source={phoneIcon}
                    style={{ width: 250, height: 250 }}
                />
                <View style={styles.form}>
                    <Text style={styles.formTitle}>Sign up</Text>

                    <View style={styles.textInputContainer}>
                        <TextInput
                            onChange={(e) => setEmail(e.nativeEvent.text)}
                            value={email}
                            autoCapitalize="none"
                            style={{
                                height: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 8,
                                marginBottom: 16,
                                paddingHorizontal: 10,
                            }}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
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
                            onChange={(e) => setPassword(e.nativeEvent.text)}
                            value={password}
                            autoCapitalize="none"
                            style={{
                                height: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 8,
                                marginBottom: 4,
                                paddingHorizontal: 10,
                            }}
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                        {/* Password strength indicator */}
                        {password.length > 0 && (
                            <Text style={{
                                marginBottom: 12,
                                marginLeft: 4,
                                color:
                                    passwordStrength === 'Strong'
                                        ? 'green'
                                        : passwordStrength === 'Medium'
                                            ? 'orange'
                                            : 'red'
                            }}>
                                Password strength: {passwordStrength}
                            </Text>
                        )}
                        <TextInput
                            onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                            value={confirmPassword}
                            autoCapitalize="none"
                            style={{
                                height: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 8,
                                marginBottom: 16,
                                paddingHorizontal: 10,
                            }}
                            placeholder="Confirm password"
                            secureTextEntry={true}
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
                            onPress={handleSignUp}
                        >
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                paddingVertical: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                            }}
                            onPress={navigateToSignIn}
                        >
                            <Text style={{ color: '#007BFF', fontSize: 16, fontWeight: 'bold' }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
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

export default SignUp;