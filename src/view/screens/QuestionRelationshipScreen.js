import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';

const RelationshipType = [
  {
    id: '1',
    name: 'Platonic Relationship',
  },
  {
    id: '2',
    name: 'Polyamorous',
  },
  {
    id: '3',
    name: 'Monogamous',
  },
  {
    id: '4',
    name: 'Open relationship',
  },
  {
    id: '5',
    name: 'One night stand',
  },
  {
    id: '6',
    name: 'Regular FWB',
  },
  {
    id: '7',
    name: 'Life partner',
  },
  {
    id: '8',
    name: 'Short term Relationship',
  },
  {
    id: '9',
    name: 'Long term Relationship',
  },
]



const QuestionRelationshipScreen = ({ navigation, route }) => {
  const { email, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState([]);
  const [typeOfRealtionship, setTypeOfRealtionship] = useState([]);
  // console.log(Education);

  const handleSelection = (item) => {
    if (selectedCategoryIndex.includes(item)) {
      // Item is already in the array, so remove it
      const newSelectedItems = selectedCategoryIndex.filter((i) => i !== item);
      setSelectedCategoryIndex(newSelectedItems);

      const newSelectedItemsTwo = typeOfRealtionship.filter((i) => i !== item);
      setTypeOfRealtionship(newSelectedItemsTwo);
    }
    else {
      // Item is not in the array, so add it
      const newSelectedItems = [...selectedCategoryIndex, item];
      setSelectedCategoryIndex(newSelectedItems);
    }
  };

  const handleOpen = (item) => {
    if (selectedCategoryIndex.includes(item)) {
      // Item is already in the array, so remove it
      const newSelectedItems = selectedCategoryIndex.filter((i) => i !== item);
      setSelectedCategoryIndex(newSelectedItems);

      const newSelectedItemsTwo = [...typeOfRealtionship, item];
      setTypeOfRealtionship(newSelectedItemsTwo);
    }
    // else {
    //   // Item is not in the array, so add it
    //   const newSelectedItems = [...selectedCategoryIndex, item];
    //   setSelectedCategoryIndex(newSelectedItems);
    // }
  };


  const onReligionScreen = () => {
    // const selectitem = RelationshipType[selectedCategoryIndex].name;
    // console.log(typeOfRealtionship);
    // return
    if (typeOfRealtionship?.length > 0) {
      // const Occupation = occupation;
      navigation.navigate('QuestionReligionScreen', { RelationshipType: typeOfRealtionship, email: email, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your relationship type you are looking for!", ToastAndroid.SHORT);
    }
  }
  const onSkip = () => {
    navigation.navigate('QuestionReligionScreen', { RelationshipType: [], email: email, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })

  }



  const ListRelationShips = ({ value, setValue }) => {
    return (
      <View>
        {RelationshipType.map((TypeTestimonial, index) => (
          <View key={index}>
            <TouchableOpacity
              // key={index}
              activeOpacity={0.8}
              onPress={() => handleSelection(TypeTestimonial.name)}
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
                  {selectedCategoryIndex.includes(TypeTestimonial.name) || typeOfRealtionship.includes(TypeTestimonial.name) ? (
                    <SVGImg width={20} height={20} />
                  ) : (null
                  )}
                </View>
              </View>
            </TouchableOpacity>
            {selectedCategoryIndex.includes(TypeTestimonial.name) && (
              <View style={{
                backgroundColor: COLORS.white,
                marginHorizontal: 20,
                // elevation:4,
                borderWidth: 1,
                borderColor: COLORS.light,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingHorizontal: 20
              }}>
                {/* Render the sub-options for the selected item here */}
                <TouchableOpacity
                  onPress={() => handleOpen(TypeTestimonial.name)}
                  style={{
                    height: 40,
                    justifyContent: 'center'
                  }}>
                  <Text style={{ color: COLORS.gray, fontSize: 13, }}>Open</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSelection(TypeTestimonial.name)}
                  style={{
                    height: 40,
                    justifyContent: 'center'
                  }}>
                  <Text style={{ color: COLORS.gray, fontSize: 13, }}>Closed</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

      </View>
    )
  }



  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>

        <View style={{
          alignItems: 'center',
          // paddingTop: 20,
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


        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>

            <View style={{
              paddingTop: 0,
              alignItems: 'center',
              paddingHorizontal: 50,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center'
              }}>What type of relationship you are looking for?</Text>
            </View>
            <View style={{
              alignItems: 'center',
              paddingTop: 10
            }}>
              <Text style={{
                color: COLORS.black
              }}>Select all that apply</Text>
            </View>
            <View>
              <ListRelationShips value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} />
            </View>


            <View style={{
              marginVertical: 50,
              alignItems: 'center',
              paddingBottom: 5,
              // height: '20%'
            }}>
              <View style={{
                marginBottom: 5
              }}>
                <CustomeButton onpress={() => onReligionScreen()}
                  title={'Continue'} />
              </View>
              <CustomeButton onpress={() => onSkip()}
                title={'Skip'} bcolor={COLORS.light} />

              <View style={{
                paddingTop: 5,
                width: 310,
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


export default QuestionRelationshipScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    // height: '100%',
    marginBottom: 100,
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
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})