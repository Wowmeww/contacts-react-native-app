import phoneIcon from '@/assets/images/mine/phoneIcon.png';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Loading from '@/components/myComponents/loader';
import { getLoggedInUser, loginUser } from '@/localstorage';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';


function SignIn() {
    let loading = false;
    const navigation = useNavigation();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    getLoggedInUser().then(user => {
        if (user) navigation.navigate('(tabs)');
    });

// clearDatabase();
    const handleSigIn = () => {
        loginUser(email, password).then((res) => {
            if(res.success) {
                 router.push('/(tabs)');
            }
        });
    }
    const navigateToSignUp = () => {
        router.push('/signup');
    }

    return (
        <SafeAreaView style={styles.screen}>
            {loading && <Loading />}
            <View style={styles.container}>
                <Image
                    source={phoneIcon}
                    style={{ width: 250, height: 250 }}
                />
                <View style={styles.form}>
                    <Text style={styles.formTitle}>Sign in</Text>

                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={{
                                height: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 8,
                                marginBottom: 16,
                                paddingHorizontal: 10,
                            }}
                            onChange={(e) => setEmail(e.nativeEvent.text)}
                            value={email}
                            autoCapitalize="none"
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={{
                                height: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 8,
                                marginBottom: 16,
                                paddingHorizontal: 10,
                            }}
                            onChange={(e) => setPassword(e.nativeEvent.text)}
                            value={password}
                            autoCapitalize="none"
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                    </View>

                    <View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#007BFF',
                                paddingVertical: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                                marginBottom: 16,
                            }}
                            onPress={handleSigIn}
                        >
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                paddingVertical: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                            }}
                            onPress={navigateToSignUp}
                        >
                            <Text style={{ color: '#007BFF', fontSize: 16, fontWeight: 'bold' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16
    },
    container: {
        paddingHorizontal: 16,
        gap: 75,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
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
});

export default SignIn;