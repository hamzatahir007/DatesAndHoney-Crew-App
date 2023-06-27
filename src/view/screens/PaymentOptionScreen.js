import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { RadioButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { PaymentMethod } from '../../../redux/reducers/Reducers';

const PaymentType = [
    {
        id: '1',
        img: require('../../assets/paypal.png'),
        name: 'Paypal'
    },
    {
        id: '2',
        img: require('../../assets/google.png'),
        name: 'Google Pay'
    },
    {
        id: '3',
        img: require('../../assets/venmo.png'),
        name: 'Venmo'
    },
    {
        id: '4',
        img: require('../../assets/creditcard.png'),
        name: 'Credit Card'
    },
]
const PaymentOptionScreen = ({ navigation, route }) => {
    // const { BuyTickets } = route.params;
    const [name, setName] = useState();
    const [checked, setChecked] = useState(false); //initial choice
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const dispatch = useDispatch()

    const AddYourCard = () => {
        const paymentCard = PaymentType[selectedCategoryIndex].name
        if (paymentCard) {
            dispatch(PaymentMethod(paymentCard))
            // console.log(paymentCard, BuyTickets);
            navigation.navigate('AddCardScreen');
            // navigation.navigate('AddCardScreen')
        }
        else {
            ToastAndroid.show("Please select payment type!", ToastAndroid.SHORT);
        }
    }


    const ListPaymentTypes = ({ value, setValue }) => {
        return (
            <View>
                {PaymentType.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setValue(index)}
                        style={{
                            marginTop: 20,
                            marginHorizontal: 20,
                            borderRadius: 10,
                            backgroundColor: COLORS.white,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            elevation: 5,
                            padding: 20
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image source={item.img} resizeMode='contain'
                                style={{
                                    paddingHorizontal: 20
                                }} />
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                            }}>
                                {item.name}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                // onPress={() => setChecked(!checked)}
                                style={styles.rbStyle}>
                                {value == index && <View style={styles.selected} />}
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.black} />
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 80,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{ width: '20%' }}>
                                <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                >
                                    <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                                        style={{
                                            height: 45,
                                            color: COLORS.black
                                        }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '60%', alignItems: 'center', }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>Checkout</Text>
                            </View>

                            <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                            </View>
                        </View>


                        <View style={{
                            paddingHorizontal: 20
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>
                                Save Cards
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: COLORS.white,
                            height: 80,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                width: '70%',
                            }}>
                                <Text>
                                    Add a card to proceed payment through credit card
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => AddYourCard()}
                                style={{
                                    width: '30%',
                                }}>
                                <View style={{
                                    paddingHorizontal: 10,
                                    padding: 10,
                                    backgroundColor: COLORS.main,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        color: COLORS.black
                                    }}>Add card</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            paddingHorizontal: 20
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }}>
                                Other ways to pay
                            </Text>
                        </View>

                        <View>
                            <ListPaymentTypes value={selectedCategoryIndex}
                                setValue={setSelectedCategoryIndex} />
                        </View>


                    </View>

                    <View style={{
                        paddingTop: 20,
                        alignItems: 'center',
                        // height: '15%'
                    }}>
                        <TouchableOpacity disabled activeOpacity={0.7}>
                            <View style={{
                                backgroundColor: COLORS.main,
                                width: 350,
                                height: 50,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: COLORS.transparent
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                }}>Check Out</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <CustomeButton
                            title={'Check Out'} bcolor={COLORS.main} onpress={() => onCongratsBuyTickets()} /> */}
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default PaymentOptionScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        // height: '85%'
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: 45,
        width: 340,
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
    rbStyle: {
        height: 22,
        width: 22,
        borderRadius: 110,
        borderWidth: 2,
        borderColor: COLORS.gray2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        width: 15,
        height: 15,
        margin: 10,
        borderRadius: 55,
        backgroundColor: COLORS.main,
    },
})