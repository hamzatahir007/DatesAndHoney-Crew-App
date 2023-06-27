import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';



const GenderData = [
  {
    id: '1',
    name: 'Black',
  },
  {
    id: '2',
    name: 'Brown',
  },
  {
    id: '3',
    name: 'Grey',
  },
  {
    id: '4',
    name: 'blond',
  },
  {
    id: '5',
    name: 'White',
  },
  {
    id: '6',
    name: 'red',
  },
  {
    id: '7',
    name: 'Multicolor',
  },
]


const QuestionHairColorScreen = ({ navigation, route }) => {
  const { email, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, languages, ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;

  // console.log(email, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, languages, ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername);
  const [gender, setGender] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [checked, setChecked] = React.useState('Apple'); //initial choice

  // console.log(DateOfBirth);

  const onQuestionEyeColorScreen = () => {
    // console.log(GenderData[selectedCategoryIndex].name);
    const selectedColor = GenderData[selectedCategoryIndex].name;

    // console.log(selectedGender);
    // return
    if (selectedColor) {
      navigation.navigate('QuestionEyeColorScreen', { HairColor: selectedColor, email: email, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, languages: languages, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your hair color!", ToastAndroid.SHORT);
    }

    // navigation.navigate('QuestionBuildTypeScreen', { Gender: selectedGender, DateOfBirth: DateOfBirth, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, })
  }
  const onSkip = () => {
    // console.log('test');
    navigation.navigate('QuestionEyeColorScreen', { HairColor: null, email: email, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, languages: languages, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }


  const ListGender = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((gender, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              ...styles.NumberInput
            }}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  {gender.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end',
              }}>
                {value == index ? (
                  <SVGImg width={20} height={20} />
                ) : (<View></View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </View>
    )
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <View style={{
              alignItems: 'center',
              // justifyContent: 'center',
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
              paddingTop: 0,
              alignItems: 'center',
              paddingHorizontal: 20
            }}>
              <Image source={require('../../assets/haircolor.png')} resizeMode='contain' style={{
                width: 150,
                height: 200,
              }} />
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black
              }}>Which hair color do you have?</Text>
            </View>
            <View>
              <Text style={{
                color: COLORS.black,
                textAlign: 'center'
              }}>
                You can select Multiple
              </Text>
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <ListGender data={GenderData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
            </View>

          </View>


          <View style={styles.footer}>

            <View style={{
              paddingTop: 20,
              // flexDirection: 'row',
            }}>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onQuestionEyeColorScreen()}
                  title={'Continue'} />
              </View>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onSkip()}
                  title={'Skip'} bcolor={COLORS.light} />
              </View>
            </View>

            <View style={{
              paddingTop: 5,
              width: 310,
              paddingBottom: 20
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>



        </ScrollView>
      </View>



    </SafeAreaView>
  )
}

export default QuestionHairColorScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '100%',
    // backgroundColor: COLORS.black,
    // alignItems: 'center',
  },
  footer: {
    height: '25%',
    alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
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