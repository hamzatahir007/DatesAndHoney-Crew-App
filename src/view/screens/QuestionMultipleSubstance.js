import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg from '../../assets/tik.svg';
import SVGImg1 from '../../assets/arrowleft.svg';
import CustomeDropDwon from '../components/CustomeDropDwon';
const { width, height } = Dimensions.get('window')

const Data = [
  {
    id: '1',
    name: 'Never',
  },
  {
    id: '2',
    name: 'Sometimes',
  },
  {
    id: '3',
    name: 'Socially',
  },
  {
    id: '3',
    name: 'Reglarly',
  },
  {
    id: '3',
    name: 'Heavily',
  },
  {
    id: '3',
    name: 'Prefer not say',
  },
]

const QuestionMultipleSubstance = ({ navigation, route }) => {
  const { email, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [smokeVisibale, setSmokeVisibale] = useState(false);
  const [smokeData, setSmokeData] = useState(null);
  const [vapeVisibale, setVapeVisibale] = useState(false);
  const [vapeData, setVapeData] = useState(null);
  const [marijuanaVisibale, setMarijuanaVisibale] = useState(false);
  const [marijuanaData, setMarijuanaData] = useState(null);
  const [drugsVisibale, setDrugsVisibale] = useState(false);
  const [drugsData, setDrugsData] = useState(null);
  const [drinkVisibale, setDrinkVisibale] = useState(false);
  const [drinkData, setDrinkData] = useState(null);

  // console.log(route.params);

  const onSmokeScreen = () => {
    if (smokeData && vapeData && marijuanaData && drugsData && drinkData) {
      navigation.navigate('QuestionInstagramScreen', { Drink: drinkData, email: email, Drugs: drugsData, Marijauna: marijuanaData, Vape: vapeData, Smoke: smokeData, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView,  filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      if (!smokeData) {
        ToastAndroid.show("Please select do you smoke!", ToastAndroid.SHORT);
      }
      else if (!vapeData) {
        ToastAndroid.show("Please select do you vape!", ToastAndroid.SHORT);
      }
      else if (!marijuanaData) {
        ToastAndroid.show("Please select do you marijuana!", ToastAndroid.SHORT);
      }
      else if (!drugsData) {
        ToastAndroid.show("Please select do you drugs!", ToastAndroid.SHORT);
      }
      else if (!drinkData) {
        ToastAndroid.show("Please select do you drink!", ToastAndroid.SHORT);
      }
    }
  }
  const SkipScreen = () => {
    navigation.navigate('QuestionInstagramScreen', { Drink: null, email: email, Drugs: null, Marijauna: null, Vape: null, Smoke: null, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }


  const ListSmokeData = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {Data.map((item, index) => (
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

        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.footer}>

            <CustomeDropDwon title={'Do you Smoke'} data={Data} value={smokeData} setValue={setSmokeData} valueVisibale={smokeVisibale} setValueVisibale={setSmokeVisibale} />

            <CustomeDropDwon title={'Do you use Vape?'} data={Data} value={vapeData} setValue={setVapeData} valueVisibale={vapeVisibale} setValueVisibale={setVapeVisibale} />

            <CustomeDropDwon title={'Do you use Marijauna?'} data={Data} value={marijuanaData} setValue={setMarijuanaData} valueVisibale={marijuanaVisibale} setValueVisibale={setMarijuanaVisibale} />

            <CustomeDropDwon title={'Do you Drugs?'} data={Data} value={drugsData} setValue={setDrugsData} valueVisibale={drugsVisibale} setValueVisibale={setDrugsVisibale} />

            <CustomeDropDwon title={'Do you Drink?'} data={Data} value={drinkData} setValue={setDrinkData} valueVisibale={drinkVisibale} setValueVisibale={setDrinkVisibale} />

            {/* <View style={{
              alignItems: 'center',
              paddingBottom: 50
            }}> */}

            <View style={{
              paddingTop: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // backgroundColor:COLORS.main
            }}>
              <CustomeButton onpress={() => SkipScreen()}
                title={'Skip'} bcolor={COLORS.white} width={width / 2.4} elevation={4} />
              <CustomeButton onpress={() => onSmokeScreen()}
                title={'Continue'} width={width / 2.4} />
            </View>

            <View style={{
              paddingTop: 5,
              // width: 310,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>

            {/* </View> */}
          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default QuestionMultipleSubstance

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // height: '40%',
    alignItems: 'center',
  },
  footer: {
    // height: '60%',
    marginBottom: 80,
    paddingHorizontal: 20
    // alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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