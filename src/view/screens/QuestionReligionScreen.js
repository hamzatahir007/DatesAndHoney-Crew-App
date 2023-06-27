import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import { set } from 'react-native-reanimated';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';



const RelagionType = [
  {
    id: '1',
    name: 'Christian',
    onpress: 'QuestionMoreAboutChristianScreen'
  },
  {
    id: '2',
    name: 'Jewish',
    onpress: 'QuestionMoreAboutJewishScreen'
  },
  {
    id: '3',
    name: 'Catholic',
    onpress: 'QuestionMoreAboutCatholicScreen'
  },
  {
    id: '4',
    name: 'Muslim',
    onpress: 'QuestionMoreAboutMuslimScreen'
  },
  {
    id: '5',
    name: 'Hinduism',
  },

  {
    id: '6',
    name: 'Buddhism',
  },

  {
    id: '7',
    name: 'Chinese traditional religion',
  },
  {
    id: '8',
    name: 'Others',
  },
]

export const MoreAboutJewaish = [
  {
    id: '1',
    mom: 'Is your mom born Jewish',
  }, {
    id: '2',
    dad: 'Is your mom born Jewish',
  },
  {
    id: '3',
    Type1: 'Orthodox',
  }, {
    id: '4',
    Type2: 'Modren orthodox',
  },
  {
    id: '5',
    Type3: 'Conservative',
  }, {
    id: '6',
    Type4: 'Reformed',

  }, {
    id: '7',
    Type5: 'Just Jewish',
  }, {

    id: '8',
    Type6: 'Converted',
  }, {
    id: '9',
    Type7: 'Traditional',

  }, {
    id: '10',
    Type8: 'Secular',

  }
]



const QuestionReligionScreen = ({ navigation, route }) => {
  const { email, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState('');
  const [showtick2, setShowtick2] = useState('');
  const [showtick3, setShowtick3] = useState('');
  const [showtick4, setShowtick4] = useState('');
  const [showtick5, setShowtick5] = useState('');
  const [showtick6, setShowtick6] = useState('');
  const [showtick7, setShowtick7] = useState('');
  const [Christian, setChristian] = useState('');
  const [Jewaish, setJewaish] = useState('');
  // console.log(PartnerNature, IntroandExtro,);




  const onDietScreen = () => {
    // console.log(selectitem);
    if (selectedCategoryIndex) {
      const selectitem = RelagionType[selectedCategoryIndex]?.name;
      navigation.navigate('QuestionConvertedReligion', { Relagion: selectitem, email: email, ParentReligion: null, religionType: null, foodtype: null, KosherType: null, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your religion!", ToastAndroid.SHORT);
    }
  }
  const onSkip = () => {
    navigation.navigate('QuestionConvertedReligion', { Relagion: null, email: email, ParentReligion: null, religionType: null, foodtype: null, KosherType: null, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }


  const ListReligions = ({ value, setValue }) => {
    return (
      <View>
        {RelagionType.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => MoreAboutReligion(TypeTestimonial, index)}
          // onPress={() => setValue(index)}
          >
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              ...styles.NumberInput
            }}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  {TypeTestimonial.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
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

  const MoreAboutReligion = (TypeTestimonial, index) => {
    setSelectedCategoryIndex(index)
    console.log(TypeTestimonial.onpress);
    if (TypeTestimonial.onpress) {
      navigation.navigate(TypeTestimonial.onpress, { Relagion: TypeTestimonial.name, email: email, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    // const selectitem = RelagionType[selectedCategoryIndex].name;
    // console.log(selectitem);
    // navigation.navigate(TypeTestimonial.onpress)
    // navigation.navigate('QuestionDietScreen')
    // console.log(selectedCategoryIndex);
    // if(selectedCategoryIndex == 1){
    //   {RelagionType.map(item , selectedCategoryIndex) => (
    //     navigation.navigate('QuestionMoreAboutReligionScreen', {
    //       name: restaurant.name,
    //       image: restaurant.image_url,
    //       price: restaurant.price,
    //       review: restaurant.review_count,
    //       rating: restaurant.rating,
    //       categories: restaurant.categories,
    //   )}
    // })
    // }else{
    //   console.log('select religion');
    // }
    // const selectedItem = selectedCategoryIndex;
    // {RelagionType.findIndex((item, selectedItem ) => {
    //   console.log('name : ', item.name);
    // })}
  }

  const OnChristian = () => {
    setChristian('Christian')
    setShowtick(!showtick)
    console.log(Christian);
  }
  const OnJewaish = () => {
    setJewaish('Jewaish')
    setShowtick2(!showtick2)
  }

  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };




  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.contentContainer}>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 20,
              height: 70,
            }}>
              <View style={{
                flex: 1,
                // backgroundColor: COLORS.gray2
              }}>
                <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
              </View>
              <View style={{ flex: 3 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.black,
                  textAlign: 'center'
                }}>What is your religion?</Text>
              </View>
              <View style={{
                flex: 1,
                // backgroundColor: COLORS.gray2
              }}>
              </View>
            </View>

            <View style={{
              alignItems: 'center'
            }}>
              <ListReligions value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} />
            </View>



            <View style={{
              alignItems: 'center',
              paddingTop: 20,
              // height: '20%'
            }}>
              <View style={{
                marginBottom: 5
              }}>
                <CustomeButton onpress={() => onDietScreen()}
                  title={'Continue'} />
              </View>

              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} />

              <View style={{
                paddingTop: 5,
              }}>
                <Text style={{ textAlign: 'center', fontSize: 10 }}>
                  By continue you agree our Terms and Privacy Policy.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}


export default QuestionReligionScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // alignSelf: 'center',
    height: '100%'
  },
  footer: {
    alignItems: 'center'
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
    backgroundColor: COLORS.transparent,
  },
})