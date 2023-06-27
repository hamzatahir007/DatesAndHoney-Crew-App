import { ActivityIndicator, Dimensions, FlatList, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderTabOne from '../components/HeaderTabOne';
import COLORS from '../../consts/Colors';
import CustomeButton from '../components/CustomeButton'
import LikesCard from '../components/LikesCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { selectChatuser, selectUser } from '../../../redux/reducers/Reducers';
import { BlurView } from "@react-native-community/blur";
import SVGImg1 from '../../assets/menu.svg';
import Status from '../../assets/Status.svg';
import NonSmoker from '../../assets/NonSmoker.svg';
import Drinker from '../../assets/Drinker.svg';
import Kids from '../../assets/Kids.svg';
import Pets from '../../assets/Pets.svg';
import Orientation from '../../assets/Orientation.svg';
import Language from '../../assets/Language.svg';
import Height from '../../assets/Height.svg';
import Personality from '../../assets/Personality.svg';
import Education from '../../assets/Education.svg';
import Religion from '../../assets/Religion.svg';
import PoliticalViews from '../../assets/PoliticalViews.svg';
import FavoriteFood from '../../assets/FavoriteFood.svg';
import Exercise from '../../assets/Exercise.svg';
import Ethnicity from '../../assets/Ethnicity.svg';
import Music from '../../assets/Music.svg';
import BodyType from '../../assets/BodyType.svg';
import Slider from '@react-native-community/slider';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const filteruser = [
  {
    id: 1,
    name: 'Guys',
    value: 'Male',
  },
  {
    id: 2,
    name: 'Girls',
    value: 'Female',
  },
  {
    id: 3,
    name: 'Both',
    value: 'Both',
  },
]

const filterAdvance = [
  {
    id: 1,
    name: 'Single',
    image: <Status width={40} height={40} />
  },
  {
    id: 2,
    name: 'Non Smoker',
    image: <NonSmoker width={40} height={40} />
  },
  {
    id: 3,
    name: 'Drinker',
    image: <Drinker width={40} height={40} />
  },
  {
    id: 4,
    name: 'Kids',
    image: <Kids width={40} height={40} />
  },
  {
    id: 5,
    name: 'Pets',
    image: <Pets width={40} height={40} />
  },
  {
    id: 6,
    name: 'Orintation',
    image: <Orientation width={40} height={40} />
  },
  {
    id: 7,
    name: 'Language',
    image: <Language width={40} height={40} />
  },
  {
    id: 8,
    name: 'Height',
    image: <Height width={40} height={40} />
  },
  {
    id: 9,
    name: 'Personality',
    image: <Personality width={40} height={40} />
  },
  {
    id: 10,
    name: 'Education',
    image: <Education width={40} height={40} />
  },
  {
    id: 11,
    name: 'Religion',
    image: <Religion width={40} height={40} />
  },
  {
    id: 12,
    name: 'Political Views',
    image: <PoliticalViews width={40} height={40} />
  },
  {
    id: 13,
    name: 'Any Disability',
    image: <PoliticalViews width={40} height={40} />
  },
  {
    id: 14,
    name: 'Your Body Type',
    image: <BodyType width={40} height={40} />
  },
  {
    id: 15,
    name: 'Music',
    image: <Music width={40} height={40} />
  },
  {
    id: 16,
    name: 'Favourite Food',
    image: <FavoriteFood width={40} height={40} />
  },
  {
    id: 17,
    name: 'Exercise',
    image: <Exercise width={40} height={40} />
  },
]

const LikeDetailScreen = ({ navigation }) => {
  const [likedusers, setLikedUser] = useState(null);
  const [premiumUsers, setPremiumUsers] = useState(null);
  const [modalDataUid, setModalDataUid] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);
  const [segmentedButtons, setSegmentedButtons] = useState(false);
  const [selectGender, setSelectGender] = useState(1);
  const [selectMinMaxAge, setSelectMinMaxAge] = useState('minage');
  const [FilterModaldata, setFilterModaldata] = useState([]);
  const [uploadingPremium, setUploadingPremium] = useState(false);
  const [uploading, setUploading] = useState(false);


  const [minimumAge, setminimumAgeRange] = useState(0);
  const [maximumAge, setmaximumAgeRange] = useState(0);
  const [distance, setDistance] = useState(0);
  const user = useSelector(selectUser)
  const MatchUser = useSelector(selectChatuser);

  // console.log(user.uid);

  const fetchLikedUser = async () => {
    const userGender = user.Gender
    // console.log(userGender);
    if (userGender == 'Male') {
      fetchLikedUserFemale();
    }
    else {
      fetchLikedUserMale();
    }
  }

  const fetchLikedUserMale = async () => {
    const likedUser = [];
    await firestore()
      .collection('Users')
      .where("userDetails.Gender", '==', "Male")
      .onSnapshot(querySnapshot => {
        // console.log('Total user: ', querySnapshot.size);
        const modalDataUid = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log('User ID: ', documentSnapshot.data());
          if (documentSnapshot.data()?.PrivateChat) {
            // console.log(documentSnapshot.data()?.PrivateChat);
            documentSnapshot.data()?.PrivateChat.map(LikedUser => {
              if (LikedUser.ChatuserDetails.uid == user.uid) {
                likedUser.push(documentSnapshot.data().userDetails)
                // console.log('test', documentSnapshot.data().userDetails);
              } else {
                console.log('no like found');
                // setChatUserDetail('')
              }
            })
            // console.log('final', likedUser);
            // users.push(documentSnapshot.data().userDetails);
            // modalDataUid.push(documentSnapshot.id);
          }
        });
        setLikedUser(likedUser)
        setModalDataUid(modalDataUid)
      })
    // console.log('==>' , likedusers);
  }


  const fetchLikedUserFemale = async () => {
    const likedUser = [];
    await firestore()
      .collection('Users')
      .where("userDetails.Gender", '==', "Female")
      .onSnapshot(querySnapshot => {
        // console.log('Total user: ', querySnapshot.size);
        const modalDataUid = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log('User ID: ', documentSnapshot.data());
          if (documentSnapshot.data()?.PrivateChat) {
            // console.log(documentSnapshot.data()?.PrivateChat);
            documentSnapshot.data()?.PrivateChat.map(LikedUser => {
              if (LikedUser.ChatuserDetails.uid == user.uid) {
                likedUser.push(documentSnapshot.data().userDetails)
                // console.log('test', documentSnapshot.data().userDetails);
              } else {
                console.log('no like found');
                // setChatUserDetail('')
              }
            })
            // console.log('final', likedUser);
            // users.push(documentSnapshot.data().userDetails);
            // modalDataUid.push(documentSnapshot.id);
          }
        });
        setLikedUser(likedUser)
        console.log(likedUser);
        setModalDataUid(modalDataUid)
      })
    // console.log('==>' , likedusers);
  }



  const fetchPremiumUser = async () => {
    setUploadingPremium(true)
    if (user.PackageId == 654) {
      await firestore()
        .collection('Users')
        .onSnapshot(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const premiumU = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log(documentSnapshot.data());
            const user = documentSnapshot.data().userDetails
            // console.log(user.PackageId);
            if (!user.PackageId == 123 || !user.PackageId == 456 || !user.PackageId == 654) {
              // premiumU.push(documentSnapshot.data().userDetails);
              // console.log(documentSnapshot.data().userDetails);
              // console.log(user.uid);
            }
          })
          setPremiumUsers(premiumU.slice(0, 2))
          setUploadingPremium(false)
          // console.log(premiumU);
        })
    }
    else if (user.PackageId == 456) {
      await firestore()
        .collection('Users')
        // .where("userDetails.PackageId", '==', 123)
        // .where("userDetails.PackageId", '==', 456)
        // .where("userDetails.PackageId", '==', 654)
        // .limit(1)
        .onSnapshot(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const premiumU = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log(documentSnapshot.data());
            const user = documentSnapshot.data().userDetails
            // console.log(user.PackageId);
            if (user.PackageId == 654) {
              premiumU.push(documentSnapshot.data().userDetails);
            }
          })
          setPremiumUsers(premiumU.slice(0, 2))
          setUploadingPremium(false)
          // console.log(premiumU);
        })
    }
    else if (user.PackageId == 123) {
      await firestore()
        .collection('Users')
        // .where("userDetails.PackageId", '==', 123)
        // .where("userDetails.PackageId", '==', 456)
        // .where("userDetails.PackageId", '==', 654)
        // .limit(1)
        .onSnapshot(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const premiumU = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log(documentSnapshot.data());
            const user = documentSnapshot.data().userDetails
            // console.log(user.PackageId);
            if (user.PackageId == 456 || user.PackageId == 654) {
              premiumU.push(documentSnapshot.data().userDetails);
            }
          })
          setPremiumUsers(premiumU.slice(0, 2))
          setUploadingPremium(false)
          // console.log(premiumU);
        })
    }
    else if (!user?.PackageId) {
      await firestore()
        .collection('Users')
        // .where("userDetails.PackageId", '==', 123)
        // .where("userDetails.PackageId", '==', 456)
        // .where("userDetails.PackageId", '==', 654)
        // .limit(1)
        .onSnapshot(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const premiumU = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log(documentSnapshot.data());
            const user = documentSnapshot.data().userDetails
            // console.log(user.PackageId);
            if (user.PackageId == 123 || user.PackageId == 456 || user.PackageId == 654) {
              premiumU.push(documentSnapshot.data().userDetails);
            }
          })
          setPremiumUsers(premiumU.slice(0, 2))
          setUploadingPremium(false)
          // console.log(premiumU);
        })
    }
  }
  useEffect(() => {
    fetchLikedUser();
    fetchPremiumUser();
  }, [])


  const ApplyFilter = async () => {
    const filterGender = filteruser[selectGender]
    const filterMinAge = Math.floor(minimumAge * 100)
    const filterMaxAge = Math.floor(maximumAge * 100)
    const filterDistance = Math.floor(distance * 500)

    if (filterMinAge < 17 || filterMaxAge <= 18 || filterDistance < 20 || !filterGender) {
      if (!filterGender) {
        ToastAndroid.show("Please select gender you looking for!", ToastAndroid.SHORT);
      }
      else if (filterDistance < 20) {
        ToastAndroid.show("Distance must be 20miles atleast!", ToastAndroid.SHORT);
      }
      else if (filterMinAge < 17) {
        ToastAndroid.show("Minimum age must be 17 years atleast!", ToastAndroid.SHORT);
      }
      else if (filterMaxAge <= 18) {
        ToastAndroid.show("Maximum age must be lest then 18 years!", ToastAndroid.SHORT);
      }
    }
    else {

      // console.log(
      //   // filterAdvance,
      //   filterMinAge,
      //   filterGender.value,
      //   filterDistance,
      //   filterMaxAge,
      //   updatedArray
      //   // FilterModaldata
      // )
      // return
      setUploading(true)
      const userRef = await firestore().collection('Users')
        .doc(user.uid)
      userRef.update({
        'userDetails.filterMinAge': filterMinAge,
        'userDetails.filterGender': filterGender.value,
        'userDetails.filterDistance': filterDistance,
        'userDetails.filterMaxAge': filterMaxAge,
        'userDetails.filterAdvance': FilterModaldata?.length > 0 ? FilterModaldata?.map(({ id, name }) => ({ id, name })) : [],
      }).then(() => {
        setShowFilter(false);
        // console.log('filter updated');
        ToastAndroid.show('Filter applied!', ToastAndroid.SHORT);
        setUploading(false);
        OnCancleFilter();
      })
    }
  }

  const SelectedAdvanceFilter = (item) => {
    // console.log(item);
    // console.log(user?.PackageId);
    if (!FilterModaldata?.includes(item)) {
      if (user?.PackageId == 654) {
        FilterModaldata.push(item);
      }
      else if (FilterModaldata?.length < 3) {
        FilterModaldata.push(item);
      }
      else if (FilterModaldata?.length >= 3) {
        ToastAndroid.show('You need to buy a Premium package before applay more then three advance filter!', ToastAndroid.SHORT);
      }
    }
    else {
      ToastAndroid.show('This filter already applied!', ToastAndroid.SHORT);
      console.log('already exists, so it wont be pushed');
    }
  }

  const OnPremiumPress = (props) => {
    if (props == 1) {
      ToastAndroid.show('Please upgrade your membership package to send messages!', ToastAndroid.SHORT);
    }
    else {
      ToastAndroid.show('Please upgrade your membership package to like users', ToastAndroid.SHORT);
    }
  }

  const OnCancleFilter = () => {
    setSelectGender(1)
    setminimumAgeRange(0)
    setmaximumAgeRange(0)
    setDistance(0)
    setFilterModaldata([])
    setShowFilter(false)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: 70,
      }}>
        <View style={{
          flex: 1, paddingHorizontal: 0,
          // backgroundColor: COLORS.gray,
        }}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <SVGImg1 width={46} height={46} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 2, alignItems: 'center' }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: COLORS.black
          }}>Liked you</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
          <TouchableOpacity onPress={() => setShowMatch(!showMatch)}>
            <Text style={{
              // fontWeight: 'bold',
              // fontSize: 20,
              color: '#2A3182'
            }}>Matches</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>


        <ScrollView showsVerticalScrollIndicator={false} vertical>
          <View style={{
            backgroundColor: COLORS.white,
            paddingBottom: 20,
            marginBottom: 300,
            height: '92%'
          }}>
            <View style={{
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 20,
              paddingHorizontal: 40
            }}>
              <Text style={{
                textAlign: 'center'
              }}>These people would like to Chat with you.Like
                them back to start a conservation.</Text>
            </View>

            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
              elevation: 5,
              backgroundColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                }}>Boost for more likes</Text>
              </View>
              <View style={{
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 12
                }}>Boost your profile and get seen 30x more</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowFilter(true)}
                activeOpacity={0.8} style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 13,
                  fontWeight: 'bold'
                }}>Boost for 10$</Text>
              </TouchableOpacity>
            </View>


            {showMatch &&

              <View style={{
                paddingHorizontal: 0,
              }}>
                <View style={{
                  paddingTop: 20,
                  width: '30%',
                  paddingLeft: 20,
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: COLORS.black,
                    fontFamily: 'Roboto-Medium',
                    color: COLORS.main,
                    borderBottomColor: COLORS.main,
                    borderBottomWidth: 0.5,
                    textAlign: 'center'
                  }}>Your Matches</Text>
                </View>

                {MatchUser?.length > 0 ? (
                  // <View style={{ height: 170, width:'100%' }}>
                  <>
                    {MatchUser.map((item, index) => (
                      <View key={index} style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.gray2,
                        width: '100%',
                        // backgroundColor:COLORS.main,
                        height: 85,
                      }}>
                        <View style={{
                          marginHorizontal: 10,
                          borderRadius: 50,
                          width: '15%',
                        }}>
                          <Image source={{ uri: item.image1 }} resizeMode='contain'
                            style={{
                              width: 45,
                              height: 45,
                              borderRadius: 10,
                            }} />
                        </View>

                        <View style={{
                          width: '45%',
                          justifyContent: 'center',
                        }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                              fontWeight: 'bold',
                              color: COLORS.black,
                              paddingRight: 10,
                            }}>{item.Name}</Text>
                            <Text>now</Text>
                          </View>
                          <Text>6:13PM</Text>
                        </View>
                        <View style={{
                          // width: '40%',
                          // paddingHorizontal: 20
                        }}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('CongratsMatchScreen', {
                              userName: item.Name,
                              userImg: item.image1,
                              uid: item.uid,
                            })}
                            style={{
                              padding: 5,
                              borderRadius: 20,
                              borderWidth: 1,
                              elevation: 5,
                              backgroundColor: COLORS.white,
                              borderColor: COLORS.light,
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <Text style={{
                              paddingHorizontal: 5,
                              textAlign: 'center',
                              fontSize: 10,
                              // width: '80%',
                              color: 'red',
                            }}>Match Found!</Text>
                            <Image source={require('../../assets/heart.png')} resizeMode='contain'
                              style={{
                                tintColor: 'red',
                                width: 20,
                                height: 20,
                              }} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </>
                  // </View>
                ) : (
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.gray2,
                    width: '100%',
                    // backgroundColor:COLORS.main,
                    height: 85,
                  }}>
                    <Text>
                      (No Matches)Liked them back to get your matches..
                    </Text>
                  </View>
                )}
              </View>
            }


            <View style={{
              // alignItems: 'center',
              // justifyContent:'center',
              paddingHorizontal: 10,
            }}>
              {likedusers ? (
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: "space-between",
                  width: '100%',
                  paddingHorizontal: 10,
                }}>
                  {likedusers.map((item, index) => (
                    <View key={index}
                      style={{
                        marginTop: 20,
                        width: '45%',
                        marginHorizontal: 5,
                      }}>
                      <LikesCard image={{ uri: item.image1 }} name={item.Name} navigation={navigation}
                        description='Model at Instagram' item={item} />
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  width: '100%',
                }}>
                  <Text>
                    User's not found who's like to chat with you..
                  </Text>
                </View>
              )}

            </View>
            <View style={{
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              <View style={{
                padding: 0
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>Suggested Options</Text>
              </View>
              <View style={{
                paddingBottom: 20,
                paddingTop: 5
              }}>
                <Text>Suggested by Our concierge Team and Other Members
                  Never by Bots or Ai</Text>
              </View>
            </View>
            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
              elevation: 5,
              backgroundColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                }}>Upgrade to Premium to Unlock</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                  alignItems: 'center'
                }}>
                <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                  width: 22.14,
                  height: 14.79,
                }} />
                <Text style={{
                  color: COLORS.black,
                  fontSize: 13,
                  fontWeight: 'bold',
                  paddingLeft: 5
                }}>Upgrade</Text>
              </TouchableOpacity>
            </View>

            {/* test  */}
            <View style={{
              // alignItems: 'center',
              // justifyContent:'center',
              paddingHorizontal: 10,
            }}>
              {!uploadingPremium ?
                <>
                  {premiumUsers?.length > 0 ? (
                    <View style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: "space-between",
                      width: '100%',
                      paddingHorizontal: 10,
                    }}>
                      {premiumUsers.map((item, index) => (
                        <View key={index}
                          style={{
                            marginTop: 20,
                            width: '45%',
                            marginHorizontal: 5,
                          }}>
                          <View style={{
                            height: 200,
                            // width: '100%',-+ 
                            borderRadius: 10,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                          }}>
                            <View>
                              <Image source={{ uri: item.image1 }} resizeMode='cover'
                                blurRadius={10}
                                style={{
                                  height: 150,
                                  width: '100%',
                                  borderRadius: 10,
                                }}
                              />
                              <View style={{
                                position: 'absolute',
                                marginTop: 110,
                                paddingHorizontal: 5,
                              }}>
                                <Text style={{
                                  color: COLORS.white,
                                  fontWeight: 'bold',
                                }}>{item.Name}</Text>
                              </View>
                              <View style={{
                                position: 'absolute',
                                marginTop: 125,
                                paddingHorizontal: 5
                              }}>
                                <Text style={{
                                  color: COLORS.white,
                                  fontSize: 12
                                }}>Modal at Instagaram</Text>
                              </View>
                            </View>
                            {/* <BlurView
                            style={styles.absolute}
                            blurType="light"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white"
                          /> */}
                            <View style={{
                              flexDirection: 'row',
                              paddingHorizontal: 20,
                              paddingVertical: 5,
                              justifyContent: 'center'
                            }}>
                              <TouchableOpacity
                                onPress={() => OnPremiumPress(1)}
                                style={{
                                  padding: 5,
                                  marginHorizontal: 10,
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  elevation: 5,
                                  backgroundColor: COLORS.white,
                                  borderColor: COLORS.light,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image source={require('../../assets/message.png')} resizeMode='contain'
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => OnPremiumPress()}
                                style={{
                                  padding: 5,
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  marginHorizontal: 10,
                                  elevation: 5,
                                  backgroundColor: COLORS.white,
                                  borderColor: COLORS.light,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                  style={{
                                    tintColor: 'red',
                                    width: 20,
                                    height: 20,
                                  }} />
                              </TouchableOpacity>
                            </View>
                          </View>

                        </View>
                      ))}
                    </View>
                  ) : (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                      width: '100%',
                    }}>
                      <Text>
                        Your pass is already a premium membership, you can access sub-users now
                      </Text>
                    </View>
                  )}
                </>
                :
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  // padding:20
                  height: 70,
                  justifyContent: 'center'
                }}>
                  <ActivityIndicator size={'small'} color={COLORS.main} animating={uploadingPremium} />
                </View>
              }

            </View>




            <View style={{
              paddingHorizontal: 20,
              paddingTop: 20
            }}>
              <View style={{
                padding: 0
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>Bot matches from AI</Text>
              </View>
              <View style={{
                paddingBottom: 20,
                paddingTop: 5
              }}>
                <Text>Suggested by AI based on your profile</Text>
              </View>
            </View>
            <View style={{
              marginHorizontal: 20,
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
              elevation: 5,
              backgroundColor: COLORS.light
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  paddingVertical: 5,
                }}>Upgrade to Premium to Unlock</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Image source={require('../../assets/Crown.png')} resizeMode="contain" style={{
                  width: 22.14,
                  height: 14.79,
                }} />
                <Text style={{
                  color: COLORS.black,
                  fontSize: 13,
                  fontWeight: 'bold',
                  paddingLeft: 5
                }}>Upgrade</Text>
              </TouchableOpacity>
            </View>

            {/* temp2  */}
            <View style={{
              // alignItems: 'center',
              // justifyContent:'center',
              paddingHorizontal: 10,
            }}>
              {!uploadingPremium ?
                <>
                  {premiumUsers?.length > 0 ? (
                    <View style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: "space-between",
                      width: '100%',
                      paddingHorizontal: 10,
                    }}>
                      {premiumUsers?.map((item, index) => (
                        <View key={index}
                          style={{
                            marginTop: 20,
                            width: '45%',
                            marginHorizontal: 5,
                          }}>
                          <View style={{
                            height: 200,
                            // width: '100%',-+ 
                            borderRadius: 10,
                            backgroundColor: COLORS.white,
                            elevation: 5,
                          }}>
                            <View>
                              <Image source={{ uri: item.image1 }} resizeMode='cover'
                                blurRadius={10}
                                style={{
                                  height: 150,
                                  width: '100%',
                                  borderRadius: 10,
                                }}
                              />
                              <View style={{
                                position: 'absolute',
                                marginTop: 110,
                                paddingHorizontal: 5,
                              }}>
                                <Text style={{
                                  color: COLORS.white,
                                  fontWeight: 'bold',
                                }}>{item.Name}</Text>
                              </View>
                              <View style={{
                                position: 'absolute',
                                marginTop: 125,
                                paddingHorizontal: 5
                              }}>
                                <Text style={{
                                  color: COLORS.white,
                                  fontSize: 12
                                }}>Modal at Instagaram</Text>
                              </View>
                            </View>

                            <View style={{
                              flexDirection: 'row',
                              paddingHorizontal: 20,
                              paddingVertical: 5,
                              justifyContent: 'center'
                            }}>
                              <TouchableOpacity
                                onPress={() => OnPremiumPress(1)}
                                style={{
                                  padding: 5,
                                  marginHorizontal: 10,
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  elevation: 5,
                                  backgroundColor: COLORS.white,
                                  borderColor: COLORS.light,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image source={require('../../assets/message.png')} resizeMode='contain'
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => OnPremiumPress()}
                                style={{
                                  padding: 5,
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  marginHorizontal: 10,
                                  elevation: 5,
                                  backgroundColor: COLORS.white,
                                  borderColor: COLORS.light,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image source={require('../../assets/heart.png')} resizeMode='contain'
                                  style={{
                                    tintColor: 'red',
                                    width: 20,
                                    height: 20,
                                  }} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                      width: '100%',
                    }}>
                      <Text>
                        Your pass is already a premium membership, you can access sub-users now
                      </Text>
                    </View>
                  )}
                </>
                :
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  // padding:20
                  height: 70,
                  justifyContent: 'center'
                }}>
                  <ActivityIndicator size={'small'} color={COLORS.main} animating={uploadingPremium} />
                </View>
              }

            </View>


            {/* 
            <View style={{
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LikesCard image={require('../../assets/profile6.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
                <LikesCard image={require('../../assets/profile4.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
              </View>
            </View>

            <View style={{
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LikesCard image={require('../../assets/profile6.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
                <LikesCard image={require('../../assets/profile4.png')} name='Goria Ran, 25'
                  description='Model at Instagram' />
              </View>
            </View> */}
          </View>



          <Modal
            animationType="slide"
            transparent={true}
            visible={showFilter}
            onRequestClose={() => {
              setShowFilter(!showFilter);
            }}
          >
            <View style={{
              height: windowHeight,
              backgroundColor: COLORS.white
            }}>
              <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View>
                  <View style={{
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <TouchableOpacity onPress={() => ApplyFilter()}>
                      <Image source={require('../../assets/right.png')} resizeMode='contain' style={{
                        tintColor: COLORS.black
                      }} />
                    </TouchableOpacity>
                    <View>
                      <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLORS.black
                      }}>
                        Filter
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => OnCancleFilter()}>
                      <Image source={require('../../assets/cross.png')} resizeMode='contain' style={{
                        tintColor: COLORS.black
                      }} />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    paddingHorizontal: 20,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: COLORS.black
                    }}>
                      I'm interested in
                    </Text>
                  </View>
                  <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: COLORS.gray2,
                    marginHorizontal: 20,
                  }}>
                    {filteruser.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectGender(index)}
                        style={{
                          borderWidth: selectGender == index ? 1 : 0,
                          borderColor: selectGender == index ? '#2A3182' : null,
                          borderRadius: 10,
                          paddingHorizontal: 20,
                          paddingVertical: 15,
                          width: '33%'
                        }}>
                        <Text style={{
                          textAlign: 'center'
                        }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                  }}>
                    <View style={{
                      flex: 1,
                    }}>
                      <Text style={{
                        fontSize: 16,
                        // fontWeight: 'bold',
                        color: COLORS.black
                      }}>Age Range</Text>
                    </View>
                    <View style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }}>
                      <TouchableOpacity onPress={() => setSelectMinMaxAge('minage')}
                        style={{
                          // backgroundColor: COLORS.main,
                          // paddingHorizontal: 3,
                          // borderRadius: 4
                        }}>
                        <Text style={{
                          fontSize: 20,
                          color: COLORS.black,
                          fontWeight: 'bold'
                        }}>{Math.floor(minimumAge * 100)}</Text>
                      </TouchableOpacity>
                      <Text> - </Text>
                      <TouchableOpacity onPress={() => setSelectMinMaxAge('maxage')}
                        style={{
                          // backgroundColor: COLORS.main,
                          // paddingHorizontal: 3,
                          // borderRadius: 4
                        }}>
                        <Text style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: COLORS.black
                        }}>{Math.floor(maximumAge * 100)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {selectMinMaxAge == 'maxage' ?
                    <View style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={1}
                        thumbTouchSize={{
                          width: 40, height: 40
                        }}
                        thumbTintColor={COLORS.main}
                        minimumTrackTintColor={COLORS.main}
                        maximumTrackTintColor={COLORS.gray}
                        value={maximumAge}
                        onValueChange={(value) => setmaximumAgeRange(value)}
                      />
                    </View>
                    :
                    <View style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={1}
                        thumbTouchSize={{
                          width: 40, height: 40
                        }}
                        thumbTintColor={COLORS.main}
                        minimumTrackTintColor={COLORS.main}
                        maximumTrackTintColor={COLORS.gray}
                        value={minimumAge}
                        onValueChange={(value) => setminimumAgeRange(value)}
                      />
                    </View>
                  }

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    justifyContent: 'space-between'
                  }}>
                    <View style={{
                    }}>
                      <Text style={{
                        fontSize: 16,
                        // fontWeight: 'bold',
                        color: COLORS.black
                      }}>Distance(miles) {Math.floor(distance * 500)}</Text>
                    </View>
                    <View style={{
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.black
                      }}>Whole country</Text>
                    </View>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Slider
                      style={{ width: '100%', height: 40, }}
                      minimumValue={0}
                      maximumValue={1}
                      thumbTouchSize={{
                        width: 40, height: 40
                      }}
                      thumbTintColor={COLORS.main}
                      minimumTrackTintColor={COLORS.main}
                      maximumTrackTintColor={COLORS.gray}
                      value={distance}
                      onValueChange={(value) => setDistance(value)}
                    />
                  </View>

                  {!FilterModaldata.length == 0 &&
                    <>
                      {FilterModaldata.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                          }}>
                          <View style={{
                            flex: 1
                          }}>
                            {item?.image}
                          </View>
                          <View style={{
                            flex: 4,
                            alignItems: 'flex-start'
                          }}>
                            <Text style={{
                              fontSize: 16,
                              color: COLORS.black
                            }}>
                              {item.name}
                            </Text>
                          </View>
                          <View style={{
                            flex: 1,
                            alignItems: 'flex-end'
                          }}>
                            <Image source={require('../../assets/back.png')} resizeMode='contain' style={{
                              width: 20,
                              height: 20,
                              tintColor: COLORS.black
                            }} />
                          </View>
                        </View>
                      ))}
                    </>
                  }

                  <View style={{
                    backgroundColor: COLORS.light,
                    justifyContent: 'center',
                    paddingVertical: 20,
                    marginTop: 20
                  }}>
                    <View style={{
                      paddingHorizontal: 20,
                    }}>
                      <Text style={{
                        color: COLORS.black,
                        fontSize: 20
                      }}>Advanced fillters</Text>
                    </View>
                    <View style={{
                      paddingHorizontal: 20,
                    }}>
                      <Text style={{
                        fontSize: 13
                      }}>Mix and match up to 3 filters, or use them all
                        at once with Premium</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => setShowAdvanceFilter(!showAdvanceFilter)}
                    style={{
                      marginHorizontal: 20,
                      marginTop: -10,
                      alignItems: 'center',
                      alignSelf: 'center',
                      // padding:5,
                      borderRadius: 30,
                      backgroundColor: COLORS.main,
                      width: 30,
                      height: 30,
                      justifyContent: 'center'
                    }}>
                    {showAdvanceFilter ?
                      <Image source={require('../../assets/dropdown.png')} resizeMode='contain'
                        style={{ transform: [{ rotateZ: '-180deg' }] }}
                      />
                      :
                      <Image source={require('../../assets/dropdown.png')} resizeMode='contain' />
                    }
                  </TouchableOpacity>

                  {showAdvanceFilter == true &&
                    filterAdvance.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => SelectedAdvanceFilter(item)}
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 20,
                          marginBottom: 20,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: '25%',
                            // backgroundColor:COLORS.black
                          }}
                        //   onPress={() => navigation.navigate('SubmitStack')}
                        >
                          {item?.image}
                        </TouchableOpacity>
                        <View style={{
                          flex: 4,
                          alignItems: 'flex-start'
                        }}>
                          <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                          }}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={{
                          flex: 1,
                          alignItems: 'flex-end'
                        }}>
                          <Image source={require('../../assets/back.png')} resizeMode='contain' style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black
                          }} />
                        </View>
                      </TouchableOpacity>
                    ))
                  }


                  <View style={{
                    paddingVertical: 5, alignItems: 'center',
                    paddingTop: '30%',
                    marginBottom: 40,
                    paddingHorizontal: 20
                  }}>
                    <View>
                      <Text>
                        Answer these questions on your own profile
                        to use these filters
                      </Text>
                    </View>
                    {!uploading == true ?
                      <CustomeButton onpress={() => ApplyFilter()} title={'Apply'}
                        bcolor={COLORS.main} border={COLORS.white} />
                      :
                      <View style={{
                        backgroundColor: COLORS.main,
                        width: 329,
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
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default LikeDetailScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})