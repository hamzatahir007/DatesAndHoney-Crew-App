import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
import Slider from '@react-native-community/slider';
const { width, height } = Dimensions.get('window')


const QuestionHeightPartnerScreen = ({ navigation, route }) => {
  const { email, Height, languages, ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [minHeight, setminHeight] = useState(1);
  const [maxHeight, setmaxHeight] = useState(15);
  const [heighType, setHeightType] = useState(false);
  const [heighType2, setHeightType2] = useState(false);

  // console.log(email, Height, languages,  ExerciseStatus, Exercise, FavFood,  Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername );

  const onMinHeight = (minHeight) => {
    const convertedValue = minHeight * 15.0;
    setminHeight(convertedValue.toFixed(1))
  }

  const onMaxHeight = (maxHeight) => {
    const convertedValue = maxHeight * 15.0;
    setmaxHeight(convertedValue.toFixed(1))
  }

  const onQuestionBuildTypeScreen = () => {
    if (minHeight && maxHeight) {
      navigation.navigate('QuestionHairColorScreen', { PartnerMaxHeightType: 'feets', PartnerMinHeightType: 'feets', email: email, PartnerMaxHeight: maxHeight, PartnerMinHeight: minHeight, Height: Height, languages: languages, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please enter your partner expected Height!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionHairColorScreen', { PartnerMaxHeightType: null, email: email, PartnerMinHeightType: null, PartnerMaxHeight: null, PartnerMinHeight: null, Height: Height, languages: languages, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
     
        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
            flexDirection: 'row',
            height: 40,
            justifyContent: 'center',
          }}>
            <View style={{
              flex: 1,
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
          </View>

          <View style={{
            paddingTop: 0,
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/height.png')}
              resizeMode='contain' style={{
                height: height / 4.5
              }} />
          </View>

          <View style={{
            paddingTop: 30,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 16,
              paddingHorizontal: 30,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Select the height Range you
              would be open to dating?
            </Text>
          </View>


          <View style={{
            paddingTop: 20,
          }}>
            <View style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ color: COLORS.black }}>Minimum</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text> {minHeight}feets</Text>
              </View>
            </View>
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
              value={Math.floor(minHeight) / 15}
              onValueChange={(value) => onMinHeight(value)}
            />
          </View>

          <View style={{
            paddingTop: 20,
          }}>
            <View style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ color: COLORS.black }}>Maximum</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{maxHeight}feets</Text>
              </View>
            </View>
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
              value={Math.floor(maxHeight) / 15}
              onValueChange={(value) => onMaxHeight(value)}
            />
          </View>


        </View>


        {/* <View style={styles.footer}> */}

        <View style={{
          paddingTop: 20,
        }}>
          <View style={{
            marginBottom: 5
          }}>
            <CustomeButton width={width / 1.1} onpress={() => onQuestionBuildTypeScreen()}
              title={'Continue'} />
          </View>

          <CustomeButton onpress={() => onSkip()} width={width / 1.1}
            title={'Skip'} bcolor={COLORS.light} />
        </View>

        <View style={{
          paddingTop: 20,
          width: 310,
        }}>
          <Text style={{ textAlign: 'center', fontSize: 10 }}>
            By continue you agree our Terms and Privacy Policy.
          </Text>
        </View>
        {/* </View> */}


      </View>



    </SafeAreaView >
  )
}

export default QuestionHeightPartnerScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: '100%'

  },
  contentContainer: {
    // height: '80%',
    // alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  footer: {
    marginTop: '40%'
  },
  NumberInput: {
    marginTop: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  TextInput: {
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
  },
})