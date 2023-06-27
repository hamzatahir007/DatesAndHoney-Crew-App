import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
import Slider from '@react-native-community/slider';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import styled from 'styled-components/native'

// const SliderWrapper = styled.View`
//   margin: 20px;
//   width: 280px;
//   height: 300px;
//   justify-content: center;
// `

// const ViewContainer = styled.View`
//   align-self: center;
//   justify-content: center;
// `
// const LabelWrapper = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 20px 0;
// `

// const LabelText = styled.Text`
//   font-size: 20px;
// `


const QuestionHeightScreen = ({ navigation, route }) => {
  const { email, languages, ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [height, setHeight] = useState(1);
  const [heighType, setHeightType] = useState(false);

  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])

  const multiSliderValuesChange = (values) => setMultiSliderValue(values)


  // console.log(route.params);


  // console.log(
  //   PartnerDisability, Disability, DescribePartner, DescribeYou, languages, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, Music, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername 
  // );


  const OnHeightChange = (value) => {
    const convertedValue = value * 15.0;
    // var feet = Math.floor(realFeet);
    // console.log(convertedValue.toFixed(1));
    // const convert = Math.floor(value * 15)
    setHeight(convertedValue.toFixed(1))
  }

  const onQuestionHeightPartnerScreen = () => {
    if (height && height >= 2) {
      console.log(height);
      // // console.log(data2);
      // return
      navigation.navigate('QuestionHeightPartnerScreen', { Height: height, email: email, languages: languages, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      if (!height) {
        ToastAndroid.show("Please select your Height!", ToastAndroid.SHORT);
      }
      else if (height < 2) {
        ToastAndroid.show("Selected height must be grater 1ft!", ToastAndroid.SHORT);
      }
    }
  }

  const onSkip = () => {
    if (height) {
      navigation.navigate('QuestionHeightPartnerScreen', { Height: null, email: email, languages: languages, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Height!", ToastAndroid.SHORT);
    }
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
            paddingHorizontal: 20,

          }}>
            <View style={{
              flex: 1,
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
          </View>

          <View style={{
            paddingTop: 0
          }}>
            <Image source={require('../../assets/height.png')}
              resizeMode='contain' style={{
                height: 230
              }} />
          </View>

          <View style={{
            paddingTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              paddingHorizontal: 30,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Your Height?
            </Text>
          </View>

          <View style={{ paddingTop: 20 }}>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <View>
                <Text>
                  {height} ft
                </Text>
              </View>
              <TouchableOpacity onPress={() => setHeightType(!heighType)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text>
                  feets
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              {/* <ViewContainer>
                <SliderWrapper>
                  <LabelWrapper>
                    <LabelText>{multiSliderValue[0]} </LabelText>
                    <LabelText>{multiSliderValue[1]}</LabelText>
                  </LabelWrapper>
                  <MultiSlider
                    markerStyle={{
                      ...Platform.select({
                        ios: {
                          height: 30,
                          width: 30,
                          shadowColor: COLORS.main,
                          shadowOffset: {
                            width: 0,
                            height: 3
                          },
                          shadowRadius: 1,
                          shadowOpacity: 0.1
                        },
                        android: {
                          height: 20,
                          width: 20,
                          borderRadius: 50,
                          backgroundColor: COLORS.main
                        }
                      })
                    }}
                    pressedMarkerStyle={{
                      ...Platform.select({
                        android: {
                          height: 30,
                          width: 30,
                          borderRadius: 20,
                          backgroundColor: COLORS.main
                        }
                      })
                    }}
                    selectedStyle={{
                      backgroundColor: COLORS.main
                    }}
                    trackStyle={{
                      backgroundColor: COLORS.gray2
                    }}
                    touchDimensions={{
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      slipDisplacement: 40
                    }}
                    values={[multiSliderValue[0], multiSliderValue[1]]}
                    sliderLength={280}
                    onValuesChange={multiSliderValuesChange}
                    min={0}
                    max={100}
                    allowOverlap={false}
                    minMarkerOverlapDistance={10}
                  />
                </SliderWrapper>
              </ViewContainer> */}


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
                value={Math.floor(height) / 15}
                onValueChange={(value) => OnHeightChange(value)}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>

          <View style={{
            marginBottom: 5
          }}>
            <CustomeButton onpress={() => onQuestionHeightPartnerScreen()}
              title={'Continue'} />
          </View>
          <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
            title={'Skip'} />

          <View style={{
            paddingTop: 10,
            // width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>


      </View>



    </SafeAreaView>
  )
}

export default QuestionHeightScreen

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
    height: '20%'
    // marginTop: '40%'
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.light,
    color: COLORS.gray,
    width: 320,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
})