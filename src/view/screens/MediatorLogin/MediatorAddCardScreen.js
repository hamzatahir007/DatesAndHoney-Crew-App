import { TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { RadioButton, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux';
import { PaymentCardDetails, PaymentCards, selectMediatorUser, selectPaymentCards, selectPaymentMethod } from '../../../../redux/reducers/Reducers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';


const MediatorAddCardScreen = ({ navigation, route }) => {
    // console.log(paymentMethod);
    const data = route?.params?.data
    const PaymentMethod = useSelector(selectPaymentMethod);
    const MediatorUser = useSelector(selectMediatorUser);
    // console.log(data.name);
    const CurrentUser = auth().currentUser.uid;

    const [cardHolder, setCardHolder] = useState(data?.cardNumber ? data?.cardNumber : null);
    const [cardName, setCardName] = useState(data?.cardName ? data?.cardName : null); //initial choice
    const [ExpDate, setExpDate] = useState(null);
    const [ExpMonth, setExpMonth] = useState(data?.ExpMonth ? data?.ExpMonth : null);
    const [ExpYear, setExpYear] = useState(data?.ExpYear ? data?.ExpYear : null);
    const [DateVisibility, setDateVisibility] = useState(false);
    const [cvc, setCvc] = useState(data?.cvc ? data?.cvc : null);
    const [InputcardHolder, setInputCardHolder] = useState(false);
    const [InputcardName, setInputCardName] = useState(false); //initial choice
    const [InputExpMonth, setInputExpMonth] = useState(false);
    const [InputExpYear, setInputExpYear] = useState(false);
    const [Inputcvc, setInputCvc] = useState(false);
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();
    const SelectedPaymentCards = useSelector(selectPaymentCards)

    // console.log(SelectedPaymentCards);

    const OnPaymentScreen = () => {
        if (!cardName || !cardHolder || !ExpMonth || ExpMonth > 12 || !ExpYear || ExpYear?.length > 2 || !cvc) {
            if (!cardName) {
                ToastAndroid.show("Please enter card holder name!", ToastAndroid.SHORT);
                setInputCardName(true)
            }
            else if (!cardHolder) {
                ToastAndroid.show("Please enter card number!", ToastAndroid.SHORT);
                setInputCardHolder(true)
            }
            else if (!ExpMonth) {
                ToastAndroid.show("Please enter card expiry month!", ToastAndroid.SHORT);
                setInputExpMonth(true)
            }
            else if (ExpMonth > 12) {
                ToastAndroid.show("Please enter valid expiry month which is 12 or less!", ToastAndroid.SHORT);
                setInputExpMonth(true)
            }
            else if (!ExpYear) {
                ToastAndroid.show("Please enter card expiry year!", ToastAndroid.SHORT);
                setInputExpYear(true)
            }
            else if (ExpYear?.length > 2) {
                ToastAndroid.show("Please enter card valid expiry year in two digits!", ToastAndroid.SHORT);
                setInputExpYear(true)
            }
            else if (!cvc) {
                ToastAndroid.show("Please enter card cvc number!", ToastAndroid.SHORT);
                setInputCvc(true)
            }
        }
        else {
            let Data = new Object();
            Data.cardName = cardName
            Data.cardNumber = cardHolder
            Data.ExpMonth = ExpMonth
            Data.ExpYear = ExpYear
            Data.cvc = cvc
            Data.paymentMethod = data.name
            // console.log(Data);
            SavePayCard(Data)
            // return
            // dispatch(PaymentCards(Data))
            // // console.log('hello');
            // navigation.navigate('CheckoutScreen')

        }
    }
    const updateObjectInArray = (array, newData) => {
        const index = array.findIndex((item) => item.paymentMethod === newData.paymentMethod);
        // array[index] = newData
        // console.log(array, newData);
        // return 
        if (index !== -1) {
            array[index].cardName = newData.cardName;
            array[index].cardNumber = newData.cardNumber;
            array[index].ExpMonth = newData.ExpMonth;
            array[index].ExpYear = newData.ExpYear;
            array[index].cvc = newData.cvc;
        }
        else {
            array.push(newData);
        }
        return array;
    };


    const SavePayCard = async (Data) => {
        // console.log(Data);
        // return
        if (SelectedPaymentCards?.length > 0) {
            setUploading(true)
            const updatedPaymentCards = updateObjectInArray(SelectedPaymentCards, Data);
            // console.log(updatedPaymentCards);
            try {
                const docRef = firestore().collection('PaymentCards').doc(CurrentUser);
                await docRef.update({ PaymentCardDetails: updatedPaymentCards });
                console.log('Object updated');
                setUploading(false)
            }
            catch (e) {
                setUploading(false)
                ToastAndroid.show("Error:" + e, ToastAndroid.SHORT);
            }
        }
        else {
            setUploading(true)
            try {
                await firestore()
                    .collection('PaymentCards')
                    .doc(CurrentUser)
                    .set({
                        PaymentCardDetails: [
                            Data
                        ],
                        uid: CurrentUser
                    })
                    .then(() => {
                        setUploading(false)
                        console.log('submit');
                        navigation.navigate('MediatorAccountScreen')
                        ToastAndroid.show("Payment card added successfully!", ToastAndroid.SHORT);
                    })
            }
            catch (e) {
                setUploading(false)
                ToastAndroid.show("Error:" + e, ToastAndroid.SHORT);
            }
        }
        return
    }


    const showDateModal = () => {
        setDateVisibility(true);
    }
    const hideDiscountStartDatePicker = () => {
        setDateVisibility(false);
    };
    const handleDiscountConfirmStartDate = date => {
        setExpDate(moment(date).format('MM/DD/yy'));
        // console.warn('A date has been picked: ', date);
        // let data = new Date(date + "Z");

        // setExpDate(data);
        // hideDiscountStartDatePicker();
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.black} />
            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={{
                    backgroundColor: COLORS.white,
                    marginBottom: 100,
                }}>
                    <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // backgroundColor:COLORS.gray2,
                            height: 60,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{ width: '20%' }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Image source={require('../../../assets/arrowleft.png')} resizeMode='contain'
                                        style={{
                                            height: 45,
                                            tintColor: COLORS.black
                                        }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '60%', alignItems: 'center', }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>Add Cards</Text>
                            </View>

                            <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: -20
                        }}>
                            <View style={{
                                width: '90%',
                                backgroundColor: COLORS.white,
                                paddingVertical: 20,
                                elevation: 9,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                                marginVertical: 20
                            }}>
                                <View style={{
                                    // alignItems: 'center',
                                    // marginTop: -20
                                    paddingHorizontal: 20
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingBottom: 80
                                    }}>
                                        <View>
                                            <View>
                                                <Text style={{
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    color: COLORS.black
                                                }}>Add new card</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            alignItems: 'center'
                                        }}>
                                            {/* {PaymentMethod == 'Paypal' &&
                                                <>
                                                    <Image source={require('../../assets/paypal.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            }
                                            {PaymentMethod == 'Google Pay' &&
                                                <>
                                                    <Image source={require('../../assets/google.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            }
                                            {PaymentMethod == 'Venmo' &&
                                                <>
                                                    <Image source={require('../../assets/venmo.png')} resizeMode='contain' />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            } */}

                                            {PaymentMethod == 'Stripe' &&
                                                <>
                                                    <Image source={require('../../../assets/stripe2.png')} resizeMode='contain' style={{
                                                        width: 25,
                                                        height: 25,
                                                        borderRadius: 5,
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 10
                                                    }}>{PaymentMethod}</Text>
                                                </>
                                            }
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <View>
                                            <Text>*************</Text>
                                        </View>
                                        <View>
                                            <Text>09/25</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: -10 }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Card Holder Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={InputcardName}
                                        onFocus={() => setInputCardName(false)}
                                        activeUnderlineColor={COLORS.transparent}
                                        value={cardName}
                                        underlineColor={COLORS.transparent}
                                        placeholder={'Enter name'}
                                        placeholderTextColor={COLORS.gray2}
                                        keyboardType='email-address'
                                        onChangeText={cardName => setCardName(cardName)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}> Card Number </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        activeUnderlineColor={COLORS.transparent}
                                        error={InputcardHolder}
                                        placeholderTextColor={COLORS.gray2}
                                        onFocus={() => setInputCardHolder(false)}
                                        value={cardHolder}
                                        placeholder={'Enter number'}
                                        underlineColor={COLORS.transparent}
                                        keyboardType='phone-pad'
                                        onChangeText={cardHolder => setCardHolder(cardHolder)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}>Expiry Month</Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={InputExpMonth}
                                        onFocus={() => setInputExpMonth(false)}
                                        style={styles.TextInput}
                                        placeholder={'06'}
                                        value={ExpMonth}
                                        onChangeText={setExpMonth}
                                        // error={InputExpDate}
                                        activeUnderlineColor={COLORS.transparent}
                                        // onFocus={() => setInputExpDate(false)}
                                        placeholderTextColor={COLORS.gray2}
                                        underlineColor={COLORS.transparent}
                                    // keyboardType='email-address'
                                    // editable={true}
                                    // onPressIn={showDateModal}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}>Expiry Year</Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={InputExpYear}
                                        onFocus={() => setInputExpYear(false)}
                                        style={styles.TextInput}
                                        placeholder={'26'}
                                        value={ExpYear}
                                        onChangeText={setExpYear}
                                        // error={InputExpDate}
                                        activeUnderlineColor={COLORS.transparent}
                                        // onFocus={() => setInputExpDate(false)}
                                        placeholderTextColor={COLORS.gray2}
                                        underlineColor={COLORS.transparent}
                                    // keyboardType='email-address'
                                    // editable={true}
                                    // onPressIn={showDateModal}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black, paddingBottom: 5 }}>CVC</Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        error={Inputcvc}
                                        activeUnderlineColor={COLORS.transparent}
                                        onFocus={() => setInputCvc(false)}
                                        value={cvc}
                                        placeholderTextColor={COLORS.gray2}
                                        underlineColor={COLORS.transparent}
                                        placeholder={'Enter'}
                                        keyboardType='email-address'
                                        onChangeText={cvc => setCvc(cvc)
                                        }
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            paddingTop: 20,
                            alignItems: 'center',
                            paddingBottom: 50,
                            paddingTop: 50
                        }}>
                            {uploading ?
                                <CustomeButton title={'Please wait...'} />
                                :
                                <CustomeButton onpress={() => OnPaymentScreen()} title={'Verify Card'} />
                            }
                        </View>
                    </View>













                    <DateTimePickerModal
                        isVisible={DateVisibility}
                        mode="date"
                        // display='spinner'
                        onConfirm={handleDiscountConfirmStartDate}
                        onCancel={hideDiscountStartDatePicker}
                    />

                </View>
            </ScrollView>

            <Loader uploading={uploading} modal={uploading} />
        </SafeAreaView>
    )
}

export default MediatorAddCardScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%'
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 20,
        justifyContent: 'space-between',
        color: COLORS.light,
        height: 45,
        width: 340,
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
        color: COLORS.light
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