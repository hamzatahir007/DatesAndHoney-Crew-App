import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';

const ParentType = [
  {
    id: '1',
    name: 'Mom born Christian',
  },
  {
    id: '2',
    name: 'Dad born Christian',
  },
  {
    id: '3',
    name: 'Both born Christian',
  },
]

export const detailReligion = [
  {
    id: '1',
    name: 'Anglican',
  }, {
    id: '2',
    name: 'Aposotlic',
  },
  {
    id: '3',
    name: 'Assembly of God',
  }, {
    id: '4',
    name: 'Baptist',
  },
  {
    id: '5',
    name: 'Catholic',
  }, {
    id: '6',
    name: 'Christian Reformed',

  }, {
    id: '7',
    name: 'Church of Christ',
  }, {

    id: '8',
    name: 'Episcopalian/ Anglican',
  }, {
    id: '9',
    name: 'Evangelical',

  }, {
    id: '10',
    name: 'Interdenominal',

  }, {
    id: '11',
    name: 'Lutheran',

  },
  {
    id: '12',
    name: 'Messianic',

  },
  {
    id: '13',
    name: 'Methodist',

  },
  {
    id: '14',
    name: 'Nazarene',

  },
  {
    id: '14',
    name: 'Non-denominational',

  },
  {
    id: '14',
    name: 'Not sure',

  },
  {
    id: '14',
    name: 'Orthodox',

  },
  {
    id: '14',
    name: 'Pentecostal',

  },
  {
    id: '14',
    name: 'Presbyterian',

  },
  {
    id: '14',
    name: 'Seventh-Day Adventist',

  },
  {
    id: '14',
    name: 'Southern Baptist',

  },

]



const QuestionMoreAboutChristianScreen = ({ navigation, route }) => {
  const { email, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedParentIndex, setSelectedParentIndex] = useState(0);
  const [selectedReligionIndex, setSelectedReligionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [valueGS, setValueGS] = useState('');
  const [showtick, setShowtick] = useState(false);
  const [showtick2, setShowtick2] = useState(false);

  const onDietScreen = () => {
    const ParentReligion = ParentType[selectedParentIndex].name
    const religionType = detailReligion[selectedReligionIndex].name;
    console.log(religionType, ParentReligion);

    if (ParentReligion && religionType) {
      navigation.navigate('QuestionConvertedReligion', { ParentReligion: ParentReligion, email: email, religionType: religionType, KosherType: null, foodtype: null, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Religion!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionConvertedReligion', { ParentReligion: null, email: email, religionType: null, KosherType: null, foodtype: null, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }
  
  const onChristian = () => {
    setShowtick(!showtick)
  }

  const onChristian2 = () => {
    setShowtick2(!showtick2)
  }
  
  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };


  const renderDropdown = () => {
    if (showOptions) {
      return (
        <View style={{
          backgroundColor: COLORS.white,
          // elevation:4,
          borderWidth: 1,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderColor: COLORS.light,
          marginHorizontal: 20,
        }}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}

          {detailReligion.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setSelectedReligionIndex(index)}
            >
              <View style={styles.MoreaboutReligion}>

                <View style={{ width: '90%' }}>
                  <Text style={{ color: COLORS.black }}>{item.name}</Text>
                </View>
                <View style={{
                  alignItems: 'flex-end'
                }}>
                  {selectedReligionIndex == index ? (
                    <SVGImg width={20} height={20} />
                  ) : (<View></View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {/* </ScrollView> */}
        </View>
      );
    }
  };

  const ParentReligion = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {ParentType.map((item, index) => (
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
                  {item.name}
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
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>

            <View style={{
              // paddingTop: 40,
              paddingHorizontal: 10,
              height: 60,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '10%' }}>
                <Image source={require('../../assets/arrowleft.png')} resizeMode='contain' />
              </TouchableOpacity>
              <View style={{ width: '80%' }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.black,
                  textAlign: 'center'
                }}>More About Religion</Text>
              </View>
            </View>

            <View>
              <ParentReligion data={ParentType} value={selectedParentIndex}
                setValue={setSelectedParentIndex} cancle={require('../../assets/cross.png')} />
            </View>



            {/* <TouchableOpacity activeOpacity={0.8} onPress={onChristian}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  Is your mom born Christian
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {showtick && (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity>


          <TouchableOpacity activeOpacity={0.8} onPress={onChristian2}>
            <View style={styles.NumberInput}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>Is your dad born Christian</Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {showtick2 && (
                  <Image source={require('../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity> */}


            <TouchableOpacity onPress={toggleDropdown}>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Type</Text>
              </View>
            </TouchableOpacity>

            {renderDropdown()}
            {/* <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Muslim</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Hinduism</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Buddhism</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.NumberInput}>
                <Text style={{ color: COLORS.black }}>Chainese traditional religion</Text>
              </View>
            </TouchableOpacity> */}


            <View style={{
              marginTop: '30%',
              alignItems: 'center',
              paddingBottom: 5,
              // height: '20%'
            }}>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onDietScreen()}
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


export default QuestionMoreAboutChristianScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '100%',
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
  MoreaboutReligion: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    // paddingHorizontal: 20,
    height: 45,
    // width: 340,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light
  }
})