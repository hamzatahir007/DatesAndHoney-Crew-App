import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import COLORS from '../../consts/Colors';
import CustomeButton from '../components/CustomeButton';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import SVGImg from '../../assets/logo.svg';
const { width, height } = Dimensions.get("window");



const LoginScreen = ({ navigation }) => {


    // useEffect(() => {
    //     // Data fetch logic or any other side effect
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    GoogleSignin.configure({
        webClientId: '604072040126-h8dmu5km29t8co8shb2isrkjn4fniqj4.apps.googleusercontent.com',
    });

    // useEffect(() => {
    //     GoogleSignin.configure();
    // }, [])

    async function onGoogleSigninPress() {
        // console.log('test');
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            await GoogleSignin.signOut();
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // console.log('Token: ', idToken);
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential)
                .then((data) => {
                    // console.log('==>', data.user.uid);
                    if (data) {
                        afterGoogleLogin()
                    }
                    else {
                        ToastAndroid.show("This account is already used in the Main app.", ToastAndroid.SHORT);
                    }
                    return
                });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('sign in cancelled');
            }
            else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('sign in is in progress already');
            }
            else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdateb');
            }
            else {
                console.log('some other error');
            }
        }

    }

    const afterGoogleLogin = () => {
        // console.log('after');
        ToastAndroid.show('User Registered Successfully with Google', ToastAndroid.SHORT);
        navigation.navigate('MediatorNameScreen')
    }


    // function onAuthStateChanged(user) {
    //     // console.log('user: ', user);
    //     // setAuthUser(user)
    //     if (user) {
    //         console.log('user login Succesfully', user);
    //         ToastAndroid.show('User already sign In please fill the form', ToastAndroid.SHORT);
    //         navigation.navigate('MediatorQuestionHaveKidsScreen')
    //     }
    // }

    return (
        <ImageBackground source={require('../../assets/loginbackground.png')} resizeMode="cover" style={StyleSheet.absoluteFillObject}>
            <View style={styles.overlay} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ alignItems: 'center' }}>
                    <View style={{ paddingTop: 40 }}>
                        <SVGImg width={144} height={103} />
                    </View>

                    <View style={{
                        paddingTop: 20,
                        width: 310,
                        // paddingBottom:150,
                    }}>
                        <Text style={{ textAlign: 'center', color: COLORS.white }}>
                            The only dating app designed to help you find your soulmate. Filled with different types of events, designed for young professionals & couples
                        </Text>
                    </View>

                    <View style={{
                        paddingTop: 50,
                        width: 310,
                    }}>
                        <Text style={{ textAlign: 'center', color: COLORS.white }}>
                            Lets get started
                        </Text>
                    </View>

                    <View style={{ paddingTop: 20, }}>

                        <CustomeButton width={width / 1.1} onpress={() => navigation.navigate('MediatorLoginWithNumberScreen')} title={'Login with phone number'} />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 45,
                        paddingTop: 35,
                    }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: COLORS.white }} />
                        <View>
                            <Text style={{
                                width: 50,
                                textAlign: 'center',
                                color: COLORS.white,
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>Or</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: COLORS.white }} />
                    </View>

                    <View style={{
                        paddingTop: 35,
                    }}>
                        <CustomeButton width={width / 1.1} color={COLORS.white} bcolor={COLORS.black} image={require('../../assets/apple.png')} title={'Continue with Apple'} />
                    </View>

                    <View style={{
                        paddingTop: 15,
                    }}>
                        <CustomeButton width={width / 1.1} bcolor={COLORS.blue} color={COLORS.white} image={require('../../assets/facebook.png')} title={'Continue with Facebook'} />
                    </View>

                    <View style={{
                        paddingTop: 15,
                    }}>
                        <CustomeButton width={width / 1.1} color={COLORS.black} bcolor={COLORS.white} image={require('../../assets/google.png')} title={'Continue with Google'}
                            onpress={() => onGoogleSigninPress()} />
                    </View>


                    <View
                        // onPress={() => navigation.navigate('MadiatorStack')}
                        style={{
                            paddingTop: 50,
                        }}>
                        <Text style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.white,
                            textAlign: 'center',
                            color: COLORS.white
                        }}>
                            Login as Mediator
                        </Text>
                    </View>


                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    absoluteFillObject: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // flex: 1,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
    }
})