import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from 'react-redux';
import { selectMediatorUser } from '../../../../redux/reducers/Reducers';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const { width , height} = Dimensions.get('window')

const Eventdata = [
    {
        id: '1',
        title: 'Grand Party at salvik',
        location: 'South Karolina, New City',
        price: '155',
        image: require('../../../assets/event1.png')
    },
    {
        id: '2',
        title: 'Grand Party at khi',
        location: 'Karachi, New City',
        price: '255',
        image: require('../../../assets/event1.png')
    }
];




const MediatorDashboardScreen = ({ navigation }) => {
    const currentuser = useSelector(selectMediatorUser);
    // console.log(currentuser.POSFood);
    // const timeStamp = new Date().toString();
    // console.log(timeStamp);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [allEvents, setAllEvents] = useState();
    const [Date2, setDate2] = useState('');
    const [category, setCategory] = useState()
    const [foods, setFoods] = useState()
    const [loading, setLoading] = useState(false);




    const FetchEvents = async () => {
        // setLoading(true)
        await firestore()
            .collection('Events')
            .orderBy('timeStamp' , 'desc')
            .onSnapshot(querySnapshot => {
                // console.log('==>' , querySnapshot.data());
                const data = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const eventdata = documentSnapshot.data()
                    if (eventdata.owneruid == currentuser?.userDetails?.uid) {
                        // console.log('User ID: ', documentSnapshot.data());
                        data.push(documentSnapshot.data());
                    }
                    //   // modalDataUid.push(documentSnapshot.id);
                });
                // dispatch(events(data))
                setAllEvents(data)
                // console.log(data);
            });
        // setLoading(false)
    }

    const fectchMenu = async () => {
        try {
            setLoading(true)
            await firestore()
            .collection('Foods')
            .orderBy('timeStamp' , 'desc')
                .onSnapshot(querySnapshot => {
                    const data = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        const FoodData = documentSnapshot.data()
                        if (FoodData.owneruid == currentuser?.userDetails?.uid) {
                            data.push(documentSnapshot.data());
                        }
                    });
                    console.log(data);
                    setFoods(data)
                });
            setLoading(false)
        }
        catch (e) {
            console.log(e);
        }
    }



    useEffect(() => {
        FetchEvents();
        fectchMenu();
    }, [])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView vertical showsVerticalScrollIndicator={false}
                    style={{
                        width: '100%',
                        paddingTop: 20
                    }}
                >
                    {currentuser?.userDetails?.POSFood == 1 ?
                        <>
                            <View style={{
                                alignItems: 'center',
                                // paddingTop: 20
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                }}>Your Foods</Text>
                            </View>

                            <View style={{ marginBottom: 40, }}>
                                {!foods?.length == 0 ?
                                    <View style={{
                                        flexDirection: 'row',
                                        // backgroundColor:COLORS.main,
                                        flexWrap: 'wrap',
                                        alignSelf:'center',
                                        justifyContent: "space-between",
                                        width: width/1.1,
                                        marginBottom: 50
                                    }}>
                                        {foods?.map((item, index) => (
                                            <View
                                                key={index}
                                                style={{
                                                    marginTop: 20,
                                                    width: '45%',
                                                    backgroundColor: COLORS.white,
                                                    marginBottom: 5,
                                                    borderRadius: 10,
                                                    // elevation:8
                                                }}>
                                                <TouchableOpacity
                                                    style={{
                                                        width: '100%',
                                                    }}>
                                                    <Image source={{ uri: item.image1 }} resizeMode='cover' style={{
                                                        width: '100%',
                                                        height: 120,
                                                        borderRadius:10,
                                                       elevation:9,
                                                    }} />
                                                </TouchableOpacity>
                                                <View style={{
                                                    width: '100%',
                                                    // backgroundColor:COLORS.main,
                                                    paddingLeft: 10,
                                                    height:30,
                                                    // backgroundColor:COLORS.main,
                                                    justifyContent:'center'
                                                }}>
                                                    <Text style={{
                                                        color: COLORS.black,
                                                        fontSize: 16,
                                                        fontWeight:'bold'
                                                    }}>{item.name}</Text>
                                                </View>
                                                <View style={{
                                                    width: '100%',
                                                    flexDirection: 'row',
                                                    marginBottom: 3,
                                                    marginTop:10,
                                                    paddingHorizontal: 10,
                                                    height:30,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                }}>
                                                    <View style={{
                                                        width: '50%',
                                                        // backgroundColor: COLORS.gray
                                                    }}>
                                                        <Text style={{ fontSize:14, color: COLORS.black, fontWeight: 'bold' }}>${item.PricePerItem}<Text style={{
                                                            color:COLORS.gray,
                                                            fontSize:10,
                                                        }}>.00</Text></Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('MediatorEditFoodScreen', { details: item })} style={{
                                                            // height: '80%',
                                                            width:'50%',
                                                            paddingHorizontal: 10,
                                                            backgroundColor: COLORS.main,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            paddingVertical: 5,
                                                            borderRadius: 5,
                                                            marginTop: -10,
                                                        }}>
                                                        <Text style={{
                                                            color: COLORS.black,
                                                            fontSize: 12
                                                        }}>Details</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        ))}

                                    </View>
                                    :
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 100,
                                        paddingTop: 10
                                    }}>
                                        <Text>Dont Have Foods? Please Upload It First.</Text>
                                    </View>
                                }
                            </View>
                        </>
                        :
                        <>
                            <View style={{
                                alignItems: 'center',
                                // paddingTop: 20,
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black,
                                }}>Added Events</Text>
                            </View>
                            {allEvents?.length > 0 ?
                                <View style={{
                                    marginTop:20,
                                    marginBottom:50
                                }}>
                                    {allEvents?.map((item, index) => (
                                        <TouchableOpacity key={index}
                                            // onPress={() => onEventDeatilsScreen({ item })}
                                            // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                                            activeOpacity={0.7}
                                            style={{
                                                width: width / 1.1,
                                                backgroundColor: COLORS.white,
                                                elevation: 5,
                                                alignSelf:'center',
                                                // borderColor: COLORS.light,
                                                borderRadius: 20,
                                                // borderWidth: 1,
                                                // marginHorizontal: 20,
                                                marginBottom: 20,
                                            }}>
                                            <View>
                                                <Image source={{ uri: item?.image1 }} resizeMode='cover'
                                                    style={{
                                                        width: '100%',
                                                        height: 200,
                                                        borderRadius: 10,
                                                    }} />
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                padding: 10,
                                            }}>
                                                <View>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: COLORS.black,
                                                    }}>{item?.Title}</Text>
                                                </View>
                                                <View>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: COLORS.black,
                                                        fontWeight: 'bold'
                                                    }}>${item?.totalTicketPrice}</Text>
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
                                                    width:'75%'
                                                }}>
                                                    <View style={{
                                                        marginRight: 10,
                                                    }}>
                                                        <Image source={require('../../../assets/location.png')} style={{
                                                            borderTopRightRadius: 20,
                                                            borderTopLeftRadius: 20,
                                                        }} />
                                                    </View>
                                                    <View >
                                                        <Text style={{
                                                            color: COLORS.black,
                                                            fontSize: 12
                                                        }}>{item?.location}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('MediatorEditEventScreen', { details: item })}
                                                        style={{
                                                            padding: 5,
                                                            paddingHorizontal: 10,
                                                            backgroundColor: COLORS.main,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 20,
                                                        }}>
                                                        <Text style={{ fontSize: 12, }}>Detail</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                :
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 20,
                                }}>
                                    <Text>No events found please add events first!</Text>
                                </View>
                            }

                        </>

                    }



                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default MediatorDashboardScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        // paddingHorizontal: 20,
        backgroundColor: COLORS.white
    },
    contentContainer: {
        // borderRadius:50,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:COLORS.black
    },
})