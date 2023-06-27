import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import SVGImg1 from '../../assets/arrowleft.svg';

const TypeTestimonial = [
  {
    id: '1',
    name: '#Sushi',
  },
  {
    id: '2',
    name: '#Foodie i love Everything',
  },
  {
    id: '3',
    name: '#Italian',
  },
  {
    id: '4',
    name: '#Japanese',
  },
  {
    id: '5',
    name: '#Mitterrandian',
  },
  {
    id: '5',
    name: '#I love trying new food',
  },
  {
    id: '5',
    name: '#I hate trying new food',
  },
  {
    id: '5',
    name: '#I like simple bland food',
  }
]



const QuestionFavFoodScreen = ({ navigation, route }) => {
  const { email, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [search, setsearch] = useState();
  const [FavFood, setFavFood] = useState(TypeTestimonial);
  const [tempFavFood, settempFavFood] = useState(TypeTestimonial);
  const [selectedItems, setSelectedItems] = useState([]);

  // console.log(route.params);

  const handleSelection = (item) => {
    const newSelectedItems = [...selectedItems, item];
    setSelectedItems(newSelectedItems);
  };

  const handleRemoval = (item) => {
    const newSelectedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelectedItems);
  };

  const searchFilterinterest = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = FavFood.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredDataSource(newData);
      settempFavFood(newData);
      setsearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      settempFavFood(FavFood);
      setsearch(text);
    }
  };


  const onExersizeScreen = () => {
    // const FavFood = TypeTestimonial[selectedCategoryIndex].name
    // console.log(FavFood);
    if (!selectedItems.length == 0) {
      navigation.navigate('QuestionExersizeScreen', { FavFood: selectedItems, email: email, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select your Food!", ToastAndroid.SHORT);
    }
  }

  const onSkip = () => {
    navigation.navigate('QuestionExersizeScreen', { FavFood: null, email: email, Diet: Diet, ConvertedReligionDetail: ConvertedReligionDetail, ConvertedReligion: ConvertedReligion, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, RelationshipType: RelationshipType, Education: Education, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, IntroandExtro: IntroandExtro, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, Experince: Experince, InTenYear: InTenYear, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
  }

  const ListTestimonial = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <View
            key={index}
            activeOpacity={0.8}
            // onPress={() => setValue(index)}
            onPress={() => handleSelection(TypeTestimonial.name)}
            // style={styles.button}
            style={styles.itemContainer}>
            <TouchableOpacity style={{
              backgroundColor: selectedItems.includes(TypeTestimonial.name) ? COLORS.main : COLORS.transparent,
              borderWidth: selectedItems.includes(TypeTestimonial.name) ? 0 : 1,
              borderColor: selectedItems.includes(TypeTestimonial.name) ? COLORS.main : COLORS.gray,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 5,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
              onPress={() => handleSelection(TypeTestimonial.name)}>
              <View style={{
                flexDirection: 'row',
                paddingHorizontal: 5
              }}>
                <Text>{TypeTestimonial.name}</Text>
              </View>

              {selectedItems.includes(TypeTestimonial.name) ? (
                <TouchableOpacity onPress={() => handleRemoval(TypeTestimonial.name)}>
                  <Image source={cancle} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleRemoval(TypeTestimonial.name)}>
                  <Image source={require('../../assets/add2.png')} resizeMode='contain' style={{
                    color: COLORS.black
                  }} />
                </TouchableOpacity>
              )
              }
            </TouchableOpacity>
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
          justifyContent: 'center',
          paddingTop: 20,
          flexDirection: 'row',
          height: 40,
          justifyContent: 'center',
          paddingHorizontal: 20,

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
          <View style={{
            paddingTop: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image source={require('../../assets/diet.png')} resizeMode='contain' style={{
              width: 220,
              height: 200,
            }} />
          </View>


          <View style={{
            alignItems: 'center',
            paddingHorizontal: 70,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center',
            }}>Favourite Food</Text>
          </View>

          <View style={styles.NumberInput}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                marginRight: 5
              }} />
              <TextInput
                value={search}
                placeholder={'Search'}
                onChangeText={search => searchFilterinterest(search)
                }
                style={styles.TextInput}
              />
            </View>
          </View>


          <View style={{ paddingTop: 10, marginHorizontal: 20 }}>
            <ListTestimonial data={tempFavFood} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../assets/cross.png')} />
          </View>

          <View style={{
            paddingTop: 80,
            // flexDirection: 'row'
            alignItems: 'center'
          }}>
            <View style={{ marginBottom: 5 }}>
              <CustomeButton onpress={() => onExersizeScreen()}
                title={'Continue'} />
            </View>
            <CustomeButton onpress={() => onSkip()}
              title={'Skip'} bcolor={COLORS.light} />

          </View>

          <View style={{
            paddingVertical: 5,
            // width: 310,
            paddingBottom: 50
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>

        </ScrollView>
      </View>

    </SafeAreaView >
  )
}

export default QuestionFavFoodScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: '100%',
  },
  contentContainer: {
    height: '40%',
    alignItems: 'center',
  },
  footer: {
    height: '60%',
    alignItems: 'center',
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 45,
    // width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  Options: {
    marginTop: 0,
    justifyContent: 'center',
    width: 340,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    width: '88%'
  },
  button: {
    flexDirection: 'row',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
  },
  toggelbtn: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 40,
    paddingHorizontal: 5,
    justifyContent: 'space-between'
  },
  itemContainer: {
    flexDirection: 'row',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
    // flexDirection: 'row',
    // // height: 30,

    // alignItems: 'center',
    // justifyContent: 'space-between',
    // // padding: 10,
    // // paddingHorizontal: 10,
    // margin: 5,
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
})