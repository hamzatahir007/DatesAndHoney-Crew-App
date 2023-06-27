import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
import { TextInput } from 'react-native-paper';
const { width, height } = Dimensions.get('window')


const QuestionInstagramScreen = ({ navigation, route }) => {
  const { email, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [instagram, setinstagram] = useState();
  const [instagramError, setinstagramError] = useState(false);

  console.log(DateOfBirth);

  const onOccupationScreen = () => {
    // console.log(instagram);
    if (instagram) {
      navigation.navigate('QuestionOccupationScreen', { InstaUsername: instagram, email: email, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please enter instagram user name!", ToastAndroid.SHORT);
      setinstagramError(true)
    }
  }
  const SkipScreen = () => {
    navigation.navigate('QuestionOccupationScreen', { InstaUsername: null, Drink: Drink, email: email, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView,filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }


  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 20,
            height: 50,
          }}>
            <View style={{
              flex: 1,
              // backgroundColor: COLORS.gray2
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 2,
              // backgroundColor: COLORS.gray,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 20
            }}>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: COLORS.gray2
            }}>
            </View>
          </View>


          <View style={{
            paddingTop: 0,
            flexDirection: 'row',
          }}>
            <Image source={require('../../assets/insta.png')} resizeMode='contain' style={{
              width: width / 3,
            }} />

            <Image source={require('../../assets/Socialmedia4.png')} resizeMode='contain' style={{
              width: 150,
              position: 'absolute',
              marginTop: 80,
              marginLeft: 80
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            // paddingTop: 20,
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Do you want to connect your Instagram?</Text>
          </View>


          <View style={styles.NumberInput}>
            <TextInput
              value={instagram}
              placeholder={'Enter your username'}
              error={instagramError}
              onChangeText={instagram => setinstagram(instagram)
              }
              underlineColor={COLORS.white}
              activeUnderlineColor={COLORS.transparent}
              onFocus={() => setinstagramError(false)}
              style={styles.TextInput}
            />
          </View>





          <View style={{
            marginTop: '40%',
            alignItems: 'center'
            // flexDirection: 'row'
          }}>
            <View style={{ marginBottom: 5 }}>
              <CustomeButton onpress={() => onOccupationScreen()}
                title={'Continue'} />
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <CustomeButton onpress={() => SkipScreen()}
                title={'Skip'} bcolor={COLORS.light} />
            </View>
          </View>


        </View>



            </View>



    </SafeAreaView >
  )
}

export default QuestionInstagramScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%',
    alignItems: 'center',
  },
  NumberInput: {
    marginTop: 30,
    justifyContent: 'center',
    // paddingHorizontal: 20,
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})