import { ActivityIndicator, Button, Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import COLORS from '../../../consts/Colors'
import { useState } from 'react';
import CustomeButton from '../../components/CustomeButton';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { selectMediatorUser, selectUser } from '../../../../redux/reducers/Reducers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import SVGAdd from '../../../assets/Plus.svg';
import SVGCross from '../../../assets/cross2.svg';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

// import Geocoder from 'react-native-geocoding';
// import Geocoder from 'react-native-geocoder';
// import Geocoder from 'react-native-geocoder';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// Geocoder.init("AIzaSyBWDLUnBrqcrId_1VThjFVfaFbcOZEA_Uw"); // use a valid API key


const MediatorEditFoodScreen = ({ navigation, route }) => {
    const { details } = route.params;
    // console.log('==>', details);
    const currentuser = useSelector(selectMediatorUser);
    // console.log(currentuser);
    // for events states
    const [imageArray, setImageArray] = useState([
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
    ]);
    const [image1, setImage1] = useState(details.image1);
    const [image2, setImage2] = useState(details.secimageUrl);
    const [image3, setImage3] = useState(details.thirdimageUrl);
    const [image4, setImage4] = useState(details.fourthimageUrl);
    const [image5, setImage5] = useState(details.fifthimageUrl);
    const [image6, setImage6] = useState(details.sixthimageUrl);
    const [uploading, setUploading] = useState(false);

    //for food states
    const [transferred, setTransferred] = useState(0);

    const [foodTypeindex, setFoodTypeIndex] = useState(details.categoryid);
    const [FoodType, setFoodType] = useState(0);
    const [search, setSearch] = useState(0);
    const [yourEvents, setYourEvents] = useState(null);
    const [yourEventsTemp, setYourEventsTemp] = useState(null);
    const [selectEvent, setSelectEvent] = useState(details.Eventid);
    const [name, setName] = useState(details.name);
    const [description, setDescription] = useState(details.description);
    const [PricePerItem, setPricePerItem] = useState(details.PricePerItem);
    const [DeliveryTime, setDeliveryTime] = useState(details.DeliveryTime);
    const [
        defaultAnimationDialog, setDefaultAnimationDialog
    ] = useState(false);

    const OnAddTicket = () => {
        if (!ticketTitle || !pricePerTicket || !totalTickets || !discountPerTicket || !discountStartDate || !discountendDate || !discountstartTime || !discountendTime) {
            if (!ticketTitle) {
                ToastAndroid.show("Please select Ticket Title first!", ToastAndroid.SHORT);
            }
            else if (!pricePerTicket) {
                ToastAndroid.show("Please select Price PerTicket first!", ToastAndroid.SHORT);
            }
            else if (!totalTickets) {
                ToastAndroid.show("Please select Total Tickets first!", ToastAndroid.SHORT);
            }
            else if (!discountPerTicket) {
                ToastAndroid.show("Please select Discount Per Tickets first!", ToastAndroid.SHORT);
            }
            else if (!discountStartDate) {
                ToastAndroid.show("Please select Start Date first!", ToastAndroid.SHORT);
            }
            else if (!discountendDate) {
                ToastAndroid.show("Please select End Date first!", ToastAndroid.SHORT);
            }
            else if (!discountstartTime) {
                ToastAndroid.show("Please select Start Time first!", ToastAndroid.SHORT);
            }
            else if (!discountendTime) {
                ToastAndroid.show("Please select end Time first!", ToastAndroid.SHORT);
            }
        }
        else {
            var Data = new Object();
            Data.ticketTitle = ticketTitle;
            Data.pricePerTicket = pricePerTicket;
            Data.totalTickets = totalTickets;
            Data.discountPerTicket = discountPerTicket;
            Data.discountStartDate = discountStartDate;
            Data.discountendDate = discountendDate;
            Data.discountstartTime = discountstartTime;
            Data.discountendTime = discountendTime;

            // console.log('Ticket data', Data);
            // nopeee.push(Data);
            TicketModaldata.push(Data);

            // console.log('final data', nopeee);
            setLocationModalVisible(false);
        }

    }
    // console.log(TicketModaldata);
    // setTicketModaldata(nopeee)

    const pickImage1 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage1(result.assets[0].uri);
    };
    const pickImage2 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage2(result.assets[0].uri);
    };
    const pickImage3 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage3(result.assets[0].uri);
    };
    const pickImage4 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage4(result.assets[0].uri);
    };
    const pickImage5 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage5(result.assets[0].uri);
    };
    const pickImage6 = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        if (result.assets[0].uri) {
            const newSelectedItems = [...imageArray, result.assets[0].uri];
            setImageArray(newSelectedItems);
        }
        setImage6(result.assets[0].uri);
    };





    const OnHandleEvents = () => {
        if (imageArray?.length < 1 || !name || !description || !PricePerItem || !DeliveryTime || selectEvent == null || foodTypeindex == null) {
            if (imageArray?.length < 1) {
                ToastAndroid.show("Please Select At Least Three Images!", ToastAndroid.SHORT);
            }
            else if (!name) {
                ToastAndroid.show("Please Enter Food Name First!", ToastAndroid.SHORT);
            }
            else if (!description) {
                ToastAndroid.show("Please Add Description First!", ToastAndroid.SHORT);
            }
            else if (!PricePerItem) {
                ToastAndroid.show("Please Add Price Per Item First!", ToastAndroid.SHORT);
            }
            else if (!DeliveryTime) {
                ToastAndroid.show("Please Add Delivery Time First!", ToastAndroid.SHORT);
            }
            else if (selectEvent == null) {
                ToastAndroid.show("Please select Event first!", ToastAndroid.SHORT);
            }
            else if (foodTypeindex == null) {
                ToastAndroid.show("Please select Food Category first!", ToastAndroid.SHORT);
            }
        }
        else {
            OnUpdateFood();
        }
    }

    const getNameById = (array, id) => array.find(item => item.uid === id)?.category || '';

    const OnUpdateFood = async () => {
        // const categoryName = FoodType[foodTypeindex].category
        // const categoryid = FoodType[foodTypeindex].uid
        // // const categoryImage = FoodType[foodTypeindex].image
        // const Eventid = yourEvents[selectEvent].uid

        const isHttpsFormatOne = /^https:\/\//.test(image1);
        const isHttpsFormatTwo = /^https:\/\//.test(image2);
        const isHttpsFormatThree = /^https:\/\//.test(image3);
        const isHttpsFormatFoure = /^https:\/\//.test(image4);
        const isHttpsFormatFife = /^https:\/\//.test(image5);
        const isHttpsFormatSix = /^https:\/\//.test(image6);

        try {
            setUploading(true)
            var Data = new Object();
            Data.image1 = isHttpsFormatOne == true ? image1 : await uploadImage();
            Data.secimageUrl = isHttpsFormatTwo == true ? image2 : await uploadSecondImage();
            Data.thirdimageUrl = isHttpsFormatThree == true ? image3 : await uploadThirdImage();
            Data.fourthimageUrl = isHttpsFormatFoure == true ? image4 : await uploadFourthImage();
            Data.fifthimageUrl = isHttpsFormatFife == true ? image5 : await uploadFifthImage();
            Data.sixthimageUrl = isHttpsFormatSix == true ? image6 : await uploadSixthImage();
            Data.categoryid = foodTypeindex
            Data.categoryName = getNameById(FoodType, foodTypeindex);
            Data.Eventid = selectEvent;
            Data.name = name;
            Data.description = description;
            Data.PricePerItem = PricePerItem;
            Data.DeliveryTime = DeliveryTime;
            Data.owneruid = currentuser?.userDetails?.uid;
            Data.ownerName = currentuser?.userDetails?.Name;
            Data.owneremail = currentuser?.userDetails?.email;
            Data.uid = details?.uid;
            Data.timeStamp = new Date().toString();
            // console.log(Data);
            // return;
            const Docres = firestore().collection('Foods').doc(Data.uid)
            Docres.update(Data).then(() => {
                ToastAndroid.show('Food Updated successfully', ToastAndroid.SHORT)
                navigation.goBack()
                RefereshForm();
            })
            // // setImage(null)
            setUploading(false)
        } catch (error) {
            setUploading(false)
            console.log('error test1', error);
        }
    }


    const openEditModal = (index) => {
        const data = TicketModaldata[index];
        data.index = index
        // console.log(data);
        setEditeTicket(data)
        setLocationModalVisible(!LocationModalVisible)
        setActionTriggered('ACTION_3');
    }

    const uploadImage = async () => {
        if (image1 == null) {
            return null;
        }
        const uploadUri = image1;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Foods/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadSecondImage = async () => {
        if (image2 == null) {
            return null;
        }
        const uploadUri = image2;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Foods/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadThirdImage = async () => {
        if (image3 == null) {
            return null;
        }
        const uploadUri = image3;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Foods/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadFourthImage = async () => {
        if (image4 == null) {
            return null;
        }
        const uploadUri = image4;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Foods/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadFifthImage = async () => {
        if (image5 == null) {
            return null;
        }
        const uploadUri = image5;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Foods/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    const uploadSixthImage = async () => {
        if (image6 == null) {
            return null;
        }
        const uploadUri = image6;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + '.' + extension;
        const storageRef = storage().ref(`Foods/${filename}`);
        const task = storageRef.putFile(uploadUri);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };


    const RefereshForm = () => {
        setName('')
        setDescription('')
        setPricePerItem('')
        setDeliveryTime('')
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setImage5(null)
        setImage6(null)
        setYourEvents(null)
    }

    const DeleteForm = () => {
        console.log('delete', details.uid);
        // return
        firestore()
            .collection('Foods')
            .doc(details.uid)
            .delete()
            .then(() => {
                RefereshForm();
                setDefaultAnimationDialog(false)
                navigation.goBack();
                console.log('Event deleted!');
                ToastAndroid.show('Item Deleted successfully', ToastAndroid.SHORT)
            });
    }
    const CancleForm = () => {
        // setName('')
        // setDescription('')
        // setStartDate('')
        // setEndDate('')
        // setStartTime('')
        // setEndTime('')
        // setImage1(null)
        // setLocation('')
        // setTotalTicketPrice('')
        // setTicketModaldata([])
        navigation.goBack();
    }

    const UpdatediteTicket = () => {
        const index = editeTicket.index;
        // data.index = index
        // console.log(index);
        // setEditeTicket(data)


        var Data = new Object();
        Data.ticketTitle = editeTitle
        Data.pricePerTicket = editePrice;
        Data.totalTickets = editeTotalTickets;
        // Data.editeTicket = editeTicket;
        Data.discountPerTicket = editeDiscountTickets
        Data.discountStartDate = editeDiscountStartDate;
        Data.discountendDate = editeDiscountEndDate;
        Data.discountstartTime = editeDiscountStartTime;
        Data.discountendTime = editeDiscountEndTime;
        // console.log(Data);

        TicketModaldata[index] = Data;

        // setEditeTicket(Data)
        setLocationModalVisible(false)
    }
    // console.log('===>', TicketModaldata);
    const FetchEvents = async () => {
        // setLoading(true)
        await firestore()
            .collection('Events')
            .orderBy('timeStamp', 'desc')
            .onSnapshot(querySnapshot => {
                const data = [];

                querySnapshot.forEach((documentSnapshot) => {
                    const eventdata = documentSnapshot.data()
                    data.push(documentSnapshot.data());
                });
                setYourEvents(data)
                setYourEventsTemp(data)
                // querySnapshot.forEach((documentSnapshot) => {
                //     const eventdata = documentSnapshot.data()
                //     if (eventdata.owneruid == currentuser.uid) {
                //         // console.log('User ID: ', documentSnapshot.data());
                //         data.push(documentSnapshot.data());
                //     }
                //     //   // modalDataUid.push(documentSnapshot.id);
                // });
                // dispatch(events(data))
                // setYourEvents(data)
                // console.log(data);
            });
        // setLoading(false)
    }



    const fectchCategroy = async () => {
        try {
            await firestore()
                .collection('FoodsCategory')
                .onSnapshot(querySnapshot => {
                    const categoryfilter = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        // console.log(documentSnapshot.data().category);
                        categoryfilter.push(documentSnapshot.data());
                    });
                    setFoodType(categoryfilter)
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            const newData = yourEvents.filter((item) => {
                const itemData = item.Title ? item.Title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            // setFilteredDataSource(newData);
            setYourEventsTemp(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setYourEventsTemp(yourEvents);
            setSearch(text);
        }
    };



    useEffect(() => {
        FetchEvents();
        fectchCategroy();
    }, [])


    return (
        <SafeAreaView>
            <View style={styles.container}>

                {/* action dialog  */}
                <Dialog
                    onTouchOutside={() => {
                        setDefaultAnimationDialog(false);
                    }}
                    width={0.9}
                    visible={defaultAnimationDialog}
                    rounded
                    actionsBordered
                    dialogAnimation={new ScaleAnimation()}
                    onHardwareBackPress={() => {
                        setDefaultAnimationDialog(false);
                        console.log('onHardwareBackPress');
                        return true;
                    }}
                    dialogTitle={
                        <DialogTitle
                            title="Delete Event?"
                            style={{
                                backgroundColor: '#F7F7F8',
                            }}
                            hasTitleBar={false}
                            align="left"
                        />
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                bordered
                                textStyle={{
                                    color: COLORS.black,
                                    fontSize: 16
                                }}
                                onPress={() => {
                                    setDefaultAnimationDialog(false);
                                }}
                                style={{
                                    backgroundColor: COLORS.light,
                                }}
                                key="button-1"
                            />
                            <DialogButton
                                text="Delete"
                                bordered
                                style={{
                                    backgroundColor: 'red',
                                }}
                                textStyle={{
                                    color: COLORS.white,
                                    fontSize: 16
                                }}
                                onPress={() => {
                                    DeleteForm();
                                }}
                                key="button-2"
                            />
                        </DialogFooter>
                    }>
                    <DialogContent
                        style={{
                            backgroundColor: '#F7F7F8',
                        }}>
                        <Text>
                            Are you sure you want to delete your event ?
                        </Text>
                    </DialogContent>
                </Dialog>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20
                }}>
                    <View style={{
                        flex: 2,
                        marginTop: 20,
                        alignItems: 'flex-end'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black,
                        }}>Food Details</Text>
                    </View>


                    <View style={{
                        flex: 1,
                        marginTop: 20,
                        alignItems: 'flex-end'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDefaultAnimationDialog(true);
                            }}
                        // onPress={() => DeleteForm()}
                        >
                            <Text style={{
                                color: 'red'
                            }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{
                        backgroundColor: COLORS.white,
                        paddingBottom: 20,
                        marginBottom: 300,
                        height: '100%'
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-end',
                            alignContent: 'stretch',
                            alignItems: 'stretch',
                            maxWidth: '100%',
                            margin: 'auto',
                            paddingHorizontal: 20,
                            paddingTop: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                width: '70%',
                                height: 200,
                                paddingRight: 5
                            }}>
                                {image1 ?
                                    <TouchableOpacity
                                        onPress={pickImage1}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Image source={{ uri: image1 }} resizeMode='cover' style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 10,
                                        }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={pickImage1}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Image source={require('../../../assets/uploadimage.png')} style={{
                                            width: 30,
                                            height: 30,
                                        }} />
                                        <Text style={{
                                            width: '70%'
                                        }}>
                                            Click to add main
                                            event image
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                width: '30%',
                                height: 200,
                                justifyContent: 'space-between'
                            }}>
                                {image2 ?
                                    <TouchableOpacity
                                        onPress={pickImage2}
                                        style={{
                                            height: 98,
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Image source={{ uri: image2 }} resizeMode='cover' style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 10,
                                        }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={pickImage2}
                                        style={{
                                            height: 98,
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Image source={require('../../../assets/add.png')} style={{
                                            width: 20,
                                            height: 20,
                                        }} />
                                    </TouchableOpacity>
                                }
                                {image3 ?
                                    <TouchableOpacity
                                        onPress={pickImage3}
                                        style={{
                                            height: 98,
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Image source={{ uri: image3 }} resizeMode='cover' style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 10,
                                        }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={pickImage3}
                                        style={{
                                            height: 98,
                                            backgroundColor: COLORS.mainlight,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Image source={require('../../../assets/add.png')} style={{
                                            width: 20,
                                            height: 20,
                                        }} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // width: '100%',
                            paddingHorizontal: 20,
                            marginTop: 5,
                            justifyContent: 'space-between'
                        }}>
                            {image4 ?
                                <TouchableOpacity
                                    onPress={pickImage4}
                                    style={{
                                        height: 98,
                                        width: '34%',
                                        marginRight: 5,
                                        backgroundColor: COLORS.mainlight,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Image source={{ uri: image4 }} resizeMode='cover' style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 10,
                                    }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={pickImage4}
                                    style={{
                                        height: 98,
                                        width: '34%',
                                        marginRight: 5,
                                        backgroundColor: COLORS.mainlight,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Image source={require('../../../assets/add.png')} style={{
                                        width: 20,
                                        height: 20,
                                    }} />
                                </TouchableOpacity>
                            }
                            {image5 ?
                                <TouchableOpacity
                                    onPress={pickImage5}
                                    style={{
                                        height: 98,
                                        width: '34%',
                                        marginRight: 5,
                                        backgroundColor: COLORS.mainlight,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Image source={{ uri: image5 }} resizeMode='cover' style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 10,
                                    }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={pickImage5}
                                    style={{
                                        height: 98,
                                        width: '34%',
                                        marginRight: 5,
                                        backgroundColor: COLORS.mainlight,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Image source={require('../../../assets/add.png')} style={{
                                        width: 20,
                                        height: 20,
                                    }} />
                                </TouchableOpacity>
                            }
                            {image6 ?
                                <TouchableOpacity
                                    onPress={pickImage6}
                                    style={{
                                        height: 98,
                                        width: '30%',
                                        marginRight: 5,
                                        backgroundColor: COLORS.mainlight,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Image source={{ uri: image6 }} resizeMode='cover' style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 10,
                                    }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={pickImage6}
                                    style={{
                                        height: 98,
                                        width: '30%',
                                        marginRight: 5,
                                        backgroundColor: COLORS.mainlight,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Image source={require('../../../assets/add.png')} style={{
                                        width: 20,
                                        height: 20,
                                    }} />
                                </TouchableOpacity>
                            }
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Food Name </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={name}
                                        placeholder={'Name'}
                                        placeholderTextColor={COLORS.gray}
                                        onChangeText={name => setName(name)
                                        }
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        style={styles.TextInput}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{
                                marginTop: 10,
                                width: 340,
                            }}>
                                <Text style={{ color: COLORS.black }}>Food Type</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: 10,
                                    width: 400,
                                }}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {FoodType?.length > 0 ?
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingRight: 50,
                                            }}>
                                                {FoodType.map((item, index) => (
                                                    // console.log(item.menu),
                                                    <TouchableOpacity key={index}
                                                        onPress={() => setFoodTypeIndex(item.uid)}
                                                        style={{
                                                            marginRight: 10,
                                                            borderRadius: 10,
                                                            backgroundColor: foodTypeindex == item.uid ? COLORS.mainlight : COLORS.transparent,
                                                            // paddingHorizontal: 10,
                                                            borderWidth: 1,
                                                            borderColor: foodTypeindex == item.uid ? COLORS.transparent : COLORS.gray2,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingHorizontal: 10,
                                                            height: 40,
                                                            width: 120,
                                                            justifyContent: 'space-between'
                                                        }}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}>
                                                            <Image source={{ uri: item.image }} resizeMode="contain" style={{
                                                                width: 30,
                                                                height: 30,
                                                                borderRadius: 10,
                                                                // padding:15,
                                                                justifyContent: 'center',
                                                            }} />
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 5 }}>{item.category}</Text>
                                                        </View>
                                                        {foodTypeindex == item.uid ?
                                                            <SVGCross width={15} height={15} />
                                                            :
                                                            <SVGAdd width={15} height={15} />
                                                        }
                                                    </TouchableOpacity>
                                                ))}
                                                {/* <TouchableOpacity
                                                // onPress={() => setFoodTypeIndex(index)}
                                                style={{
                                                    marginRight: 10,
                                                    borderRadius: 10,
                                                    backgroundColor: COLORS.mainlight,
                                                    // paddingHorizontal: 10,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.transparent,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 10,
                                                    height: 40,
                                                    width: 120,
                                                    justifyContent: 'space-between'
                                                }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    {details.categoryName == 'Burgers' &&
                                                        <>
                                                            <Image source={require('../../../assets/bargers.png')} resizeMode="contain" style={{
                                                                width: 30,
                                                                height: 30,
                                                                borderRadius: 10,
                                                                // padding:15,
                                                                justifyContent: 'center',
                                                            }} />
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 5 }}>{details.categoryName}</Text>
                                                        </>
                                                    }
                                                    {details.categoryName == 'Pizzas' &&
                                                        <>
                                                            <Image source={require('../../../assets/pizza.png')} resizeMode="contain" style={{
                                                                width: 30,
                                                                height: 30,
                                                                borderRadius: 10,
                                                                // padding:15,
                                                                justifyContent: 'center',
                                                            }} />
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 5 }}>{details.categoryName}</Text>
                                                        </>
                                                    }
                                                    {details.categoryName == 'Cakes' &&
                                                        <>
                                                            <Image source={require('../../../assets/cake.png')} resizeMode="contain" style={{
                                                                width: 30,
                                                                height: 30,
                                                                borderRadius: 10,
                                                                // padding:15,
                                                                justifyContent: 'center',
                                                            }} />
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 5 }}>{details.categoryName}</Text>
                                                        </>
                                                    }
                                                </View>
                                                <Image source={require('../../../assets/add2.png')} resizeMode="contain" style={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: 10,
                                                    padding: 6,
                                                    backgroundColor: COLORS.main,
                                                    // padding:15,
                                                    tintColor: COLORS.black,
                                                    justifyContent: 'center',
                                                }} />
                                            </TouchableOpacity> */}
                                            </View>
                                            :
                                            null}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Description </Text>
                                <View style={styles.NumberInput2}>
                                    <TextInput
                                        multiline
                                        numberOfLines={8}
                                        value={description}
                                        placeholderTextColor={COLORS.gray}
                                        placeholder={'Details'}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        onChangeText={description => setDescription(description)
                                        }
                                        style={styles.TextInput2}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Price Per Item </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={PricePerItem}
                                        placeholderTextColor={COLORS.gray}
                                        placeholder={'Enter Price'}
                                        onChangeText={PricePerItem => setPricePerItem(PricePerItem)
                                        }
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        style={styles.TextInput}
                                        editable={true}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.black }}> Delivery Time </Text>
                                <View style={styles.NumberInput}>
                                    <TextInput
                                        value={DeliveryTime}
                                        placeholder={'00 : 00'}
                                        onChangeText={DeliveryTime => setDeliveryTime(DeliveryTime)
                                        }
                                        placeholderTextColor={COLORS.gray}
                                        selectionColor={COLORS.black}
                                        underlineColor={COLORS.white}
                                        activeUnderlineColor={COLORS.white}
                                        style={styles.TextInput}
                                        editable={true}
                                    // onPressIn={showStartTimePicker}
                                    />
                                    <Image source={require('../../../assets/edit.png')} resizeMode='contain' style={{
                                        tintColor: COLORS.black,
                                        width: 15,
                                        height: 15,
                                    }} />
                                </View>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            paddingVertical: 20
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>
                                Select Event
                            </Text>
                        </View>
                        <View>
                            <View style={{
                                marginBottom: 10,
                                paddingHorizontal: 20
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: 45,
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                    paddingHorizontal: 20,
                                    backgroundColor: COLORS.light,
                                    borderRadius: 10,
                                }}>
                                    <Image source={require('../../../assets/search.png')} resizeMode='contain' style={{
                                        marginRight: 5
                                    }} />
                                    <TextInput
                                        value={search}
                                        placeholder={'Search for events'}
                                        onChangeText={search => searchFilterFunction(search)}
                                        style={styles.TextInput}
                                        underlineColor={COLORS.transparent}
                                        activeUnderlineColor={COLORS.transparent}
                                    />
                                </View>
                            </View>
                            {yourEventsTemp?.length > 0 ?
                                <View style={{
                                    marginRight: 10
                                }}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                        style={{
                                            // marginBottom: 200,
                                        }}>
                                        {yourEventsTemp?.map((item, index) => (
                                            <TouchableOpacity key={index}
                                                // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                                                activeOpacity={0.7}
                                                style={{
                                                    backgroundColor: COLORS.white,
                                                    elevation: 5,
                                                    borderColor: COLORS.light,
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    marginLeft: 20,
                                                    marginVertical: 20,
                                                    width: width / 1.3,
                                                }}>
                                                <View>
                                                    <Image source={{ uri: item.image1 }} resizeMode='cover'
                                                        style={{
                                                            // width: 270,
                                                            height: 200,
                                                            borderRadius: 10,
                                                        }} />
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    padding: 10,
                                                }}>
                                                    <View style={{
                                                        width: '70%',
                                                        paddingRight: 5,
                                                        // backgroundColor:COLORS.gray
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            color: COLORS.black,
                                                        }}>{item.Title}</Text>
                                                    </View>
                                                    <View style={{
                                                        width: '30%',
                                                        alignItems: 'flex-end'
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 13,
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
                                                        width: '75%'
                                                    }}>
                                                        <View style={{
                                                            marginRight: 10,
                                                        }}>
                                                            <Image source={require('../../../assets/location.png')} style={{
                                                                borderTopRightRadius: 20,
                                                                borderTopLeftRadius: 20,
                                                            }} />
                                                        </View>
                                                        <View>
                                                            <Text style={{
                                                                color: COLORS.black,
                                                            }}>{item.location}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        width: '25%',
                                                        alignItems: 'flex-end',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <TouchableOpacity
                                                            onPress={() => setSelectEvent(item.uid)}
                                                        >
                                                            {selectEvent == item.uid ?
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                    padding: 5,
                                                                    paddingHorizontal: 10,
                                                                    backgroundColor: COLORS.green,
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    borderRadius: 5,
                                                                    color: COLORS.white
                                                                }}>Selected</Text>
                                                                :
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                    padding: 5,
                                                                    paddingHorizontal: 10,
                                                                    backgroundColor: COLORS.main,
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    borderRadius: 5,
                                                                }}>Select</Text>
                                                            }
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                        {/* <TouchableOpacity
                                        // onPress={() => navigation.navigate('EventDetails', { detail: item })}
                                        activeOpacity={0.7}
                                        style={{
                                            backgroundColor: COLORS.white,
                                            elevation: 5,
                                            borderColor: COLORS.light,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            marginLeft: 20,
                                            marginVertical: 20,
                                            width: width / 1.1,
                                        }}>
                                        <View>
                                            <Image source={{ uri: yourEvents?.image1 }} resizeMode='cover'
                                                style={{
                                                    // width: 270,
                                                    height: 200,
                                                    borderRadius: 10,
                                                }} />
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            // justifyContent: 'space-between',
                                            padding: 10,
                                        }}>
                                            <View style={{
                                                width: '70%',
                                                paddingRight: 5,
                                                // backgroundColor:COLORS.gray
                                            }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: COLORS.black,
                                                }}>{yourEvents?.Title}</Text>
                                            </View>
                                            <View style={{
                                                width: '30%',
                                                alignItems: 'flex-end'
                                            }}>
                                                <Text style={{
                                                    fontSize: 13,
                                                    color: COLORS.black,
                                                    fontWeight: 'bold'
                                                }}>${yourEvents?.totalTicketPrice}</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 10,
                                            paddingBottom: 10,
                                            // justifyContent: 'space-between'
                                        }}>
                                            <View style={{
                                                width: '70%',
                                                flexDirection: 'row',
                                            }}>
                                                <View style={{
                                                    marginRight: 10,
                                                }}>
                                                    <Image source={require('../../../assets/location.png')} style={{
                                                        borderTopRightRadius: 20,
                                                        borderTopLeftRadius: 20,
                                                    }} />
                                                </View>
                                                <View>
                                                    <Text style={{
                                                        color: COLORS.black,
                                                    }}>{yourEvents?.location}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                width: '30%',
                                                alignItems: 'flex-end',
                                                justifyContent: 'center'
                                            }}>
                                                <TouchableOpacity
                                                // onPress={() => setSelectEvent(index)}
                                                >
                                                    <Text style={{
                                                        fontSize: 12,
                                                        padding: 5,
                                                        paddingHorizontal: 10,
                                                        backgroundColor: COLORS.green,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: 5,
                                                        color: COLORS.white
                                                    }}>Selected</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View style={{
                                        paddingHorizontal: 20,
                                    }}>
                                        <Text>No events found</Text>
                                    </View> */}
                                    </ScrollView>
                                </View>
                                :
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: 20
                                }}>
                                    <Text>No events found</Text>
                                </View>
                            }
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 40,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    marginRight: 10
                                }}>
                                    <CustomeButton
                                        onpress={() => CancleForm()}
                                        width={100} title={'Cancel'} color={COLORS.gray} bcolor={COLORS.light} />
                                </View>
                                {!uploading == true ?
                                    <CustomeButton onpress={() => OnHandleEvents()}
                                        width={200} title={'Save Changes'} color={COLORS.black} />
                                    :
                                    <View style={{
                                        backgroundColor: COLORS.main,
                                        width: 200,
                                        height: 50,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
                                    </View>
                                }
                            </View>
                        </View>

                    </View>

                </ScrollView>
            </View >
        </SafeAreaView >
    )
}

export default MediatorEditFoodScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    contentContainer: {
        // borderRadius:50,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:COLORS.black
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        height: 45,
        width: 340,
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
        // paddingHorizontal: 20,
        width: 340,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4,
        marginTop: 5,
    },
    TextInput2: {
        // paddingTop: 10,
        backgroundColor: COLORS.transparent,
        // height: 200,
        // textAlignVertical: 'top',
    },
    map: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: '100%',
        width: width,
        borderRadius: 15,
    },





    // test 
    modal: {
        backgroundColor: "#00000099",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: "#f9fafb",
        width: "100%",
        height: '100%',
        borderRadius: 5
    },
    modalHeader: {

    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 15,
        color: "#000"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray"
    },
    modalBody: {
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    modalFooter: {
    },
    actions: {
        borderRadius: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    actionText: {
        color: "#fff"
    }
})