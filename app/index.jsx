import phoneIcon from '@/assets/images/mine/phoneIcon.png';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { useNavigation } from '@react-navigation/native';

function Index() {
    const navigation = useNavigation();

    const handleSigIn = () => {
        console.log('Sign Up button pressed');
    }
    const navigateToSignUp = () => {
        navigation.navigate('signup');
    }

    return (
        <SafeAreaView style={styles.screen}>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
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
});

export default Index;