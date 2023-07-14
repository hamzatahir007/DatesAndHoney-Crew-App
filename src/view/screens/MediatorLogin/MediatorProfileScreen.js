import { Dimensions, Image, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import COLORS from '../../../consts/Colors'
import { useState } from 'react';
import CustomeButton from '../../components/CustomeButton';
import { logout, mediatorLogin, selectMediatorUser } from '../../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MediatorProfileScreen = ({ navigation }) => {
    const mediator = useSelector(selectMediatorUser);
    // console.log(mediator);
    const CurrentUser = auth().currentUser.uid;
    const [name, setName] = useState(mediator?.userDetails?.Name);
    const [nameEdit, setNameEdit] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState(mediator?.userDetails?.email);
    const [emailEdit, setEmailEdit] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [location, setLocation] = useState(mediator?.userDetails?.Address ? mediator?.userDetails?.Address : null);
    const [locationEdit, setLocationEdit] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [about, setabout] = useState(mediator?.userDetails?.Bio);
    const [aboutEdit, setaboutEdit] = useState(false);
    const [aboutError, setaboutError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();


    const OnPaymentFlow = () => {
        // console.log('here');
        navigation.navigate('MediatorAccountScreen')
    }

    const OnLogOut = () => {
        // navigation.navigate('LoginScreen')
        try {
            auth()
                .signOut()
                .then(() =>
                    console.log('User signed out!'),
                    ToastAndroid.show('Signed out!', ToastAndroid.SHORT),
                    //   navigation.navigate('LoginScreen')
                );
            // const userData = await AsyncStorage.getItem('session');
            //   await AsyncStorage.removeItem('CurrentUserData')
            //   await AsyncStorage.removeItem('CurrentUser')
            dispatch(logout());
        }
        catch (exception) {
            return false;
        }
    }
    const EMAIL_REGEX = /@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    const OnSaveChanges = async () => {
        if (name == null || name == '' || email == null || email == '' || !email === EMAIL_REGEX.test(email) || location == null || location == '' || about == null || about == '') {
            if (name == null || name == '') {
                ToastAndroid.show('Please enter new username!', ToastAndroid.SHORT)
                setNameError(true)
            }
            else if (email == null || email == '' || !email === EMAIL_REGEX.test(email)) {
                if (!email === EMAIL_REGEX.test(email)) {
                    ToastAndroid.show('Please enter valid email address!', ToastAndroid.SHORT)
                }
                else {
                    ToastAndroid.show('Please enter new email address!', ToastAndroid.SHORT)
                }
                setEmailError(true)
            }
            else if (about == null || about == '') {
                ToastAndroid.show('Please enter detail about yourself !', ToastAndroid.SHORT)
                setaboutError(true)
            }
            else if (location == null || location == '') {
                ToastAndroid.show('Please enter new address!', ToastAndroid.SHORT)
                setLocationError(true)
            }
        }
        else {
            setUploading(true)
            await firestore()
                .collection('Users').doc(CurrentUser).update({
                    'userDetails.Name': name,
                    'userDetails.Bio': about,
                    'userDetails.email': email,
                    'userDetails.Address': location,
                })
                .then(() => {
                    setUploading(false)
                    ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT)
                    // console.log('Access given to user');
                });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginBottom: 200,
                        backgroundColor: COLORS.white,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            paddingLeft: 20,
                            paddingBottom: 20
                        }}>
                            <View style={{
                                borderWidth: 3,
                                borderColor: COLORS.main,
                                borderRadius: 50
                            }}>
                                <Image source={{ uri: mediator?.userDetails?.image1 }} resizeMode='cover' style={{
                                    borderRadius: 80,
                                    width: 100,
                                    height: 100
                                }} />
                            </View>
                            <View style={{
                                justifyContent: 'center'
                                , paddingLeft: 20
                            }}>
                                <View style={{
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}>{mediator?.userDetails?.Name}</Text>
                                </View>
                                {mediator?.userDetails?.POSFood == 1 ?
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: COLORS.light,
                                        borderRadius: 5,
                                        // width: '80%',
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        marginTop: 5,
                                    }}>
                                        <Text style={{ color: COLORS.black, fontSize: 13 }}>Food Vendor</Text>
                                    </View>
                                    :
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'flex-start',
                                        backgroundColor: COLORS.light,
                                        borderRadius: 5,
                                        // width: '80%',
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        marginTop: 5,
                                    }}>
                                        <Text style={{ color: COLORS.black, fontSize: 13 }}>Event Vendor</Text>
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={nameError}
                                        onFocus={() => setNameError(false)}
                                        value={name}
                                        editable={nameEdit}
                                        placeholder={'Enter your name'}
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType='email-address'
                                        onChangeText={name => setName(name)
                                        }
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setNameEdit(!nameEdit)}>
                                        <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.black,
                                            width: 15,
                                            height: 15,
                                        }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Email </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={emailError}
                                        onFocus={() => setEmailError(false)}
                                        // aria-disabled={true}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        editable={emailEdit}
                                        value={email}
                                        placeholder={'abc@abc.com'}
                                        placeholderTextColor={COLORS.gray}
                                        onChangeText={email => setEmail(email)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setEmailEdit(!emailEdit)}>
                                        <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.black,
                                            width: 15,
                                            height: 15,
                                        }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Location </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={locationError}
                                        onFocus={() => setLocationError(false)}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        // aria-disabled={true}
                                        editable={locationEdit}
                                        value={location}
                                        placeholderTextColor={COLORS.gray}
                                        placeholder={'Enter address'}
                                        onChangeText={location => setLocation(location)
                                        }
                                        style={styles.TextInput}
                                    />
                                    <TouchableOpacity onPress={() => setLocationEdit(!locationEdit)}>
                                        <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.black,
                                            width: 15,
                                            height: 15,
                                        }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> About </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: width / 1.1,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 10,
                                    elevation: 5,
                                }}>
                                    <TextInput
                                        error={aboutError}
                                        onFocus={() => setaboutError(false)}
                                        // aria-disabled={true}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                        editable={aboutEdit}
                                        multiline
                                        numberOfLines={8}
                                        value={about}
                                        placeholder={'Details'}
                                        placeholderTextColor={COLORS.gray}
                                        onChangeText={about => setabout(about)
                                        }
                                        style={{
                                            backgroundColor: COLORS.white,
                                            // paddingBottom: 50,
                                            borderRadius: 10,
                                            width: '90%',
                                            textAlignVertical: 'bottom',
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => setaboutEdit(!aboutEdit)}>
                                        <Image source={require('../../../assets/edit.png')} resizeMode='contain'
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.black
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 40,

                        }}>
                            <CustomeButton onpress={() => OnPaymentFlow()}
                                title={'Payment Card Details'} width={width / 1.2} color={COLORS.black} bcolor={COLORS.light} border={COLORS.lighta} />
                        </View>


                        <View style={{
                            alignItems: 'center',
                            marginTop: 20,
                            // paddingHorizontal: 20,
                        }}>
                            {name != mediator?.userDetails?.Name || email != mediator?.userDetails?.email || about != mediator?.userDetails?.Bio ?
                                <>
                                    {uploading ?
                                        <View style={{
                                            backgroundColor: COLORS.main,
                                            width: width / 1.2,
                                            height: 50,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: COLORS.transparent
                                        }}>
                                            <Text style={{
                                                color: COLORS.black
                                            }}>Please wait...</Text>
                                        </View>
                                        :
                                        <CustomeButton width={width / 1.2} title={'Save Changes'} bcolor={COLORS.main} border={COLORS.main} onpress={() => OnSaveChanges()} />
                                    }
                                </>
                                :
                                <View style={{
                                    marginRight: 5,
                                }}>
                                    <CustomeButton width={width / 1.2} title={'Log out'} bcolor={COLORS.transparent} border={COLORS.gray} onpress={() => OnLogOut()} />
                                </View>
                            }
                            {/* <CustomeButton  onpress={() => OnLogOut()}
                                title={'Log out'} width={width/1.2} color={COLORS.white} /> */}
                        </View>


                    </View>
                </ScrollView>
            </View>
            <Loader uploading={uploading} modal={uploading} />
        </SafeAreaView >
    )
}

export default MediatorProfileScreen

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        width: width,
        height: height,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
        height: 45,
        width: width / 1.1,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
    NumberInput2: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 10,
        width: 340,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4,
        marginTop: 5,
    },
    TextInput2: {
        backgroundColor: COLORS.white,
        paddingBottom: 50,
        width: '90%',
        textAlignVertical: 'bottom',
    },
})