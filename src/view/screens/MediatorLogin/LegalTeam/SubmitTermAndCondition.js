import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Modal, ToastAndroid } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../../../consts/Colors';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomeButton from '../../../components/CustomeButton';
import Twitter from '../../../../assets/Twitter.svg';
import Facebook from '../../../../assets/Facebook.svg';
import WhatsApp from '../../../../assets/WhatsApp.svg';
import Reddit from '../../../../assets/Reddit.svg';
import Linkedin from '../../../../assets/Linkedin.svg';
import TikTok from '../../../../assets/TikTok.svg';
import CopyLink from '../../../../assets/copy.svg';
import Edite from '../../../../assets/edit.svg'
import Send from '../../../../assets/send.svg'
import SVGImg1 from '../../../../assets/arrowleft.svg';
import SVGImg2 from '../../../../assets/filtermenu.svg';
import Gold from '../../../../assets/gold.svg';

import { useState } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import YourClinets from '../../../components/YourClinets';
import ManageStaffCard from '../../../components/ManageStaffCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import Loader from '../../../components/Loader';
import SimpleHeader from '../../../components/SimpleHeader';

const { width, height } = Dimensions.get("window");

const data = [
    {
        id: 1,
        name: 'For Dating Users',
        screenName: 'test',
    },
    {
        id: 2,
        name: 'Roy',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 15,
        type: 'Diamond'
    },
    {
        id: 3,
        name: 'Mendela',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 390,
        type: 'Gold'
    },
    {
        id: 4,
        name: 'Sam',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 390,
        type: 'Gold'
    },
    {
        id: 5,
        name: 'Arun',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 390,
        type: 'Gold'
    }
]

const SubmitTermAndCondition = ({ navigation, route }) => {
    const { Title, Id } = route.params;
    const [uploading, setUploading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [termsandcondition, setTermsandcondition] = useState(null);
    const CurrentUser = auth().currentUser.uid;
    const [notes, setNotes] = useState(null);
    const [inputNotes, setInputNotes] = useState(false);
    // const [data, setData] = useState(null);
    const mediator = useSelector(selectMediatorUser);


    const onGoBack = () => {
        navigation.goBack();
        setNotes(null);
    }


    function addObjectToArray(array, object) {
        const index = array.findIndex(item => item.Id === object.Id);
        if (index !== -1) {
            // Object exists in the array, update it
            array[index] = object;
        } else {
            // Object doesn't exist in the array, add it
            array.push(object);
        }
        return array;
    }

    const onSubmitNote = async () => {
        if (!notes || notes == '' || notes == isNaN) {
            ToastAndroid.show("Please enter your notes first!", ToastAndroid.SHORT);
            setInputNotes(true);
        }
        else {
            let Data = new Object();
            Data.Id = Id;
            Data.Title = Title;
            Data.Description = notes;
            Data.uid = Math.random().toString(16).slice(2);

            if (termsandcondition?.length !== 0) {
                let EditArray = []
                const updatedArray = addObjectToArray(termsandcondition, Data);
                console.log(updatedArray);
                await firestore()
                    .collection('Termsandconditions').doc(CurrentUser).update({
                        TermsAndConditions: updatedArray,
                    })
                    .then(() => {
                        ToastAndroid.show(`Terms and condition ${Title} Submited!`, ToastAndroid.SHORT);
                        setUploading(false)
                        setNotes(null)
                    });
            }
            else {
                console.log('notfound');
                setUploading(true)
                await firestore()
                    .collection('Termsandconditions').doc(CurrentUser).set({
                        TermsAndConditions: [Data],
                    })
                    .then(() => {
                        ToastAndroid.show(`Terms and condition ${Title} Submited!`, ToastAndroid.SHORT);
                        // setUploadingTwo(false)
                        console.log('notes submited');
                        setUploading(false)
                        setNotes(null)
                    });
            }
        }
    };


    const fetchTermsandCondition = async () => {
        await firestore()
            .collection('Termsandconditions').doc(CurrentUser)
            .onSnapshot(documentSnapshot => {
                // console.log(docSnapshot.data());
                if (documentSnapshot.exists) {
                    // console.log('hello');
                    const terms = documentSnapshot.data()
                    // console.log(terms.TermsAndConditions);
                    // return
                    if (terms?.TermsAndConditions) {
                        // console.log(terms.TermsAndConditions);
                        setTermsandcondition(terms.TermsAndConditions)
                        // console.log(terms.TermsAndConditions);
                    }
                    else {
                        console.log('false');
                        // setTermsandcondition([])
                    }
                }
                else {
                    setTermsandcondition([])
                }
                // console.log(termsandcondition);
            })
    }
    useEffect(() => {
        fetchTermsandCondition()
    }, [])

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white,
            // paddingHorizontal: 20,
        }}>
            <View style={{
                alignItems: 'center',
                height: height / 1.5,
                // backgroundColor:COLORS.gray
            }}>
                <SimpleHeader center={"Terms And Conditions"} onpress={() => navigation.goBack()} />

                <View style={{
                    paddingTop: 0,
                }}>
                    <Image source={require('../../../../assets/notebrain.png')} resizeMode='contain' style={{
                        height: height / 4.5,
                        // width:100,
                    }} />
                </View>
                <View style={{
                    paddingTop: 30,
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.black
                    }}>Terms and condition {Title}</Text>
                </View>
                <View style={{
                    paddingTop: 20,
                }}>
                    <TextInput
                        // label='Description'
                        placeholder='Write here!'
                        placeholderTextColor={COLORS.gray}
                        value={notes}
                        mode='outlined'
                        multiline
                        numberOfLines={4}
                        error={inputNotes}
                        // onBlur={inputBio}
                        onChangeText={(notes) => setNotes(notes)}
                        onFocus={() => setInputNotes(false)}
                        activeOutlineColor={COLORS.light}
                        outlineColor={COLORS.gray2}
                        style={styles.TextInput}
                    />
                </View>
            </View>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.white,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                justifyContent: 'space-between'
            }}>
                <CustomeButton width={width / 2.3} color={COLORS.black} border={COLORS.gray} title={'Cancle'} bcolor={COLORS.transparent} onpress={() => onGoBack()} />
                <CustomeButton width={width / 2.3} title={'Submit'} bcolor={COLORS.main} onpress={() => onSubmitNote()} />
            </View>

            <Loader modal={uploading} uploading={uploading} />
        </View>
    )
}

export default SubmitTermAndCondition


const styles = StyleSheet.create({
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        // top:'60%',
        // backgroundColor:COLORS.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: 'red',
        fontSize: 12,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 45,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 5
    },
    TextInput: {
        // padding: 10,
        backgroundColor: COLORS.white,
        // color: COLORS.gray,

        width: 320,
        // borderRadius: 30,
        height: height / 4,
        textAlignVertical: 'top',
    },
})