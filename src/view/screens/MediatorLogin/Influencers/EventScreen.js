import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, ToastAndroid } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Share2 from '../../../../assets/share.svg';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import { selectMediatorUser } from '../../../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import moment from 'moment';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const EventScreen = ({ navigation }) => {
    const mediator = useSelector(selectMediatorUser);

    const [btnindex, setBtnindex] = useState(null);
    const [allEvents, setAllEvents] = useState(null);
    const [tempEvent, setTempEvent] = useState(null);
    const [tempLoading, setTempLoading] = useState(false)
    const [showPoppup, setShowPoppup] = useState(false);
    const [showPoppupLoader, setShowPoppupLoader] = useState(false);
    const [autoCode, setAutoCode] = useState(null);
    const [allUser, setAllUser] = useState(null);
    const [allAffiliateCode, setAllAffiliateCode] = useState(null);

    const fetchallUser = async () => {
        await firestore()
            .collection('Users')
            .onSnapshot(querySnapshot => {
                const users = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const data = documentSnapshot.data().userDetails;
                    users.push(data);
                })
                // export users
                setAllUser(users)
            })
    }

    const fetchAllEvents = async () => {
        setTempLoading(true)
        await firestore()
            .collection('Events')
            .orderBy('timeStamp', 'desc')
            .onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach((documentSnapshot) => {
                    // console.log(documentSnapshot.data().promoterReward);
                    if (!documentSnapshot.data().promoterReward == null || !documentSnapshot.data().promoterReward == '') {
                        data.push(documentSnapshot.data());
                    }
                });
                // data?.sort(function (a, b) {
                //     return new Date(b?.timeStamp?.toDate().toDateString() + " " + b?.timeStamp?.toDate().toTimeString()) - new Date(a?.timeStamp?.toDate().toDateString() + " " + a?.timeStamp?.toDate().toTimeString());
                // });
                setAllEvents(data)
                setTempLoading(false)
            });
    }
    const GenCode = () => {
        // setAutoCode(Math.random().toString(16).slice(2))
    }
    const CopyLink = (autoCode) => {
        Clipboard.setString('Event: ' + tempEvent?.location ? tempEvent?.location : 'Location not confirmed' + ', ' + 'Promo Code: ' + autoCode,);
        setShowPoppup(false)
        ToastAndroid.show("Link coped!", ToastAndroid.SHORT);
    }
    const generateUniqueCode = (influencerName) => {
        const timestamp = Date.now().toString(36).substring(2, 5); // Generate a timestamp-based string
        const randomChars = Math.random().toString(36).substring(2, 3); // Generate a random string
        const code = influencerName.substring(0, 3).toUpperCase() + timestamp + randomChars; // Combine influencer initials, timestamp, and random string
        return code;
    }


    const GetCode = async (item) => {
        setShowPoppup(true)
        setShowPoppupLoader(true)
        let id = Math.random().toString(16).slice(2);
        const existingVipCodes = allUser?.filter((item) => item?.uid != mediator?.userDetails?.uid && item?.VipCode)
            .map((item) => item?.VipCode);
        let uniqueCode = generateUniqueCode(mediator?.userDetails?.Name);
        while (existingVipCodes.includes(uniqueCode)) {
            uniqueCode = generateUniqueCode(mediator?.userDetails?.Name);
        }
        if (uniqueCode) {
            try {
                const querySnapshot = await firestore()
                    .collection('AffiliateCode')
                    .where('VipCode.Eventid', '==', item?.uid)
                    .where('VipCode.PromoterId', '==', mediator?.userDetails?.VipCode)
                    .get()
                if (querySnapshot.empty) {
                    const id = firestore().collection('AffiliateCode').doc().id;
                    const docRef = firestore().collection('AffiliateCode').doc(id);

                    const newData = {
                        VipCode: {
                            Eventid: item?.uid,
                            PromoterId: mediator?.userDetails?.VipCode,
                            ExpireDate: item?.startDate,
                            VipCode: uniqueCode,
                            uid: id,
                        },
                    };

                    await docRef.set(newData);
                    console.log('New document created:', id);
                    setAutoCode(uniqueCode)
                    setShowPoppupLoader(false)
                }
                else {
                    const docRef = querySnapshot.docs[0].ref;

                    await docRef.update({
                        'VipCode.ExpireDate': item?.startDate,
                        'VipCode.VipCode': uniqueCode,
                    });
                    console.log('Document updated successfully:', docRef.id);
                    setAutoCode(uniqueCode)
                    setShowPoppupLoader(false)
                }
            }
            catch (error) {
                setShowPoppupLoader(false)
                ToastAndroid.show('Error fetching documents:', error, ToastAndroid.SHORT);
            }
        }
        setTempEvent(item)
    }
    const shareCode = async (autoCode) => {
        // console.log(`Event: ${tempEvent.location ? tempEvent.location : `Location not confirmed` }, Promo Code: ${autoCode}`);
        // return
        const shareOptions = {
            title: 'Referal Code: ',

            // title: 'Promo Code: ' + autoCode,
            message: `Event: ${tempEvent.location ? tempEvent.location : `Location not confirmed` }, Promo Code: ${autoCode}`,  //string
        };

        // return
        try {
            const ShareResponce = await Share.open(shareOptions)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log('Error2', err);
                });
        }
        catch (e) {
            console.log('Error', e);
        }
    }

    useEffect(() => {
        fetchAllEvents();
        fetchallUser();
        // allEvents.map((item) => {
        //     console.log(item.image1);
        // })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                {!tempLoading ?
                    <View style={{
                    }}>
                        <View style={{
                            paddingTop: 20,
                            paddingHorizontal: 20
                        }}>
                            <View>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    color: COLORS.black,
                                    fontWeight: 'bold'
                                }}>Events Promotion</Text>
                            </View>
                            <View style={{
                                paddingVertical: 10,
                                paddingHorizontal: 10
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 12,
                                    color: COLORS.gray,
                                }}>Promote Events to earn some% of ticket sales on tickets you sell, and your Promo code will also give your followers discounts to event.</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    paddingVertical: 20,
                                }}>Current Events</Text>
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{
                                marginBottom: 300,
                                paddingHorizontal: 10
                            }}>

                                {allEvents ?
                                    <>
                                        {allEvents.map((item, index) => (
                                            <View key={index}
                                                // onPress={() => onEventDeatilsScreen({ item })}
                                                // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                                                activeOpacity={0.7}
                                                style={{
                                                    alignSelf: 'center',
                                                    backgroundColor: COLORS.gray,
                                                    elevation: 5,
                                                    borderColor: COLORS.light,
                                                    borderRadius: 10,
                                                    // borderWidth: 1,
                                                    // marginLeft: 20,
                                                    marginRight: 5,
                                                    marginBottom: 20,
                                                    width: '95%',
                                                    backgroundColor: COLORS.white
                                                }}>
                                                <View>
                                                    <Image source={{ uri: item.image1 }} resizeMode='cover'
                                                        style={{
                                                            width: '100%',
                                                            height: 200,
                                                            borderTopLeftRadius: 10,
                                                            borderTopRightRadius: 10,
                                                        }} />
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    padding: 10,
                                                    // flex: 1
                                                }}>
                                                    <View style={{
                                                        // flex: 2
                                                        width: '70%',
                                                        // backgroundColor:COLORS.gray
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            color: COLORS.black,
                                                            marginRight: 10,
                                                        }}>{item.Title}</Text>
                                                    </View>
                                                    <View style={{
                                                        // flex:1
                                                        width: '30%',
                                                        alignItems: 'flex-end',
                                                        // justifyContent:'center',
                                                        // backgroundColor:COLORS.gray
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 15,
                                                            color: COLORS.black,
                                                            fontWeight: 'bold'
                                                        }}>${item.totalTicketPrice}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingHorizontal: 10,
                                                    paddingBottom: 10,
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        width: width / 1.6,
                                                        alignItems: 'center',
                                                        // backgroundColor:COLORS.black
                                                    }}>
                                                        <View style={{
                                                            marginRight: 5,
                                                        }}>
                                                            <Image source={require('../../../../assets/location.png')} resizeMode='contain' style={{
                                                                width: 15,
                                                                height: 15
                                                            }} />
                                                        </View>
                                                        <View style={{
                                                            // width: width / 1.2
                                                            width: '90%',
                                                            // backgroundColor:COLORS.main
                                                        }}>
                                                            <Text style={{
                                                                color: COLORS.black,
                                                                fontSize: 12
                                                            }}>{item?.location ? item?.location : 'Location not confirmed'}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <TouchableOpacity
                                                            onPress={() => GetCode(item)}
                                                            style={{
                                                                padding: 5,
                                                                paddingHorizontal: 10,
                                                                backgroundColor: COLORS.main,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: 5,
                                                            }}>
                                                            <Text style={{ fontSize: 12, color: COLORS.black }}>Get Code</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>

                                        ))}
                                    </>
                                    :
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>No Events</Text>
                                        <Text style={{ color: COLORS.black, fontSize: 12, }}>Currently we do not have any events.</Text>
                                    </View>
                                }
                            </View>

                        </ScrollView>
                    </View>
                    :
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size="large" color={COLORS.main} animating={tempLoading} />
                    </View>
                }



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showPoppup}
                    onRequestClose={() => {
                        setShowPoppup(!showPoppup);
                    }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        // alignItems: 'center',
                        backgroundColor: COLORS.gray,
                        opacity: 0.9
                    }}>
                        <View style={{
                            alignSelf: 'center',
                            // margin: 20,
                            width: '95%',
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            // alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                            paddingVertical: 20,
                        }}>
                            <View>
                                <Text style={{
                                    marginVertical: 10,
                                    color: COLORS.dark,
                                    fontSize: 13,
                                    // fontWeight: 'bold'
                                    // textAlign: 'center',
                                }}>Your event promotion code is</Text>
                            </View>
                            <View style={{
                                // backgroundColor: COLORS.main,
                                // width: '50%'
                            }}>
                                {showPoppupLoader ?
                                    <View style={{
                                        paddingTop: 10,
                                        paddingBottom: 20,
                                    }}>
                                        <ActivityIndicator size={'small'} color={COLORS.main} />
                                    </View>
                                    :
                                    <Text style={{
                                        paddingTop: 10,
                                        paddingBottom: 20,
                                        // textAlign: 'center',
                                        color: COLORS.gray,
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                        fontSize: 16
                                    }}>
                                        {autoCode ? autoCode : 'Network error please try again..'}
                                    </Text>
                                }
                            </View>
                            <View style={{
                                // flex:1,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}>
                                {/* <TouchableOpacity
                                    onPress={() => GenCode()}
                                    style={{
                                        backgroundColor: COLORS.light,
                                        elevation: 5,
                                        width: '48%',
                                        // borderWidth: 1,
                                        // borderColor: COLORS.gray2,
                                        borderRadius: 10,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{
                                        color: COLORS.black,
                                    }}>
                                        Change Code
                                    </Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    onPress={() => CopyLink(autoCode)}
                                    style={{
                                        width: '48%',
                                        backgroundColor: COLORS.main,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: COLORS.main,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{
                                        color: COLORS.black,
                                    }}>
                                        Copy Link
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => shareCode(autoCode)}
                                    style={{
                                        width: '48%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: COLORS.light,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: COLORS.bluedark,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Share2 width={20} height={20} />
                                    <Text style={{
                                        color: COLORS.bluedark,
                                        // paddingLeft: 5
                                    }}>
                                        Share
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default EventScreen

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        height: height,
        // backgroundColor:COLORS.gray
    },
    NumberInput: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: 45,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
    },
})