import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/reducers/Reducers';
import SVGImg1 from '../../assets/arrowleft.svg';
const { width, height } = Dimensions.get("window");



const NameScreen = ({ navigation, route }) => {
  const { image1, image2, image3, image4, image5 } = route.params;
  const [name, setname] = useState('');
  // console.log(image1, image2, image3, image4, image5);

  const OnDateOnBirthScreen = (name) => {
    // console.log('test', name);
    if (name == '' || name.length < 3) {
      if (name == '') {
        ToastAndroid.show("Please enter your name!", ToastAndroid.SHORT);
      }
      else if (name.length < 3) {
        ToastAndroid.show("Fullname should be 3character log!", ToastAndroid.SHORT);
      }
    }
    else {
      // var Data = new Object();
      // Data.image1=image1;
      // Data.image2=image2;
      // Data.image3=image3;
      // Data.image4=image4;
      // Data.image5=image5;
      // Data.name=name;
      navigation.navigate('DateOfBirthScreen', { image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, name: name })
    }
    // dispatch({
    //   type: 'ADD_TO_USER',
    //   payload: { ...name },
    // })
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
            paddingTop: 20,
            flexDirection: 'row',
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

          <View style={{
            paddingTop: 10
          }}>
            <Image source={require('../../assets/namescreen.png')} resizeMode='contain' />
          </View>


          <View style={{
            paddingTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>What's your Name?</Text>
          </View>


          <View style={{
            paddingTop: 0,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter the full name</Text>
          </View>

          <View style={styles.NumberInput}>
            <TextInput
              value={name}
              placeholder={'Fullname'}
              // error={inputfirstName}
              onChangeText={name => setname(name)
              }
              style={styles.TextInput}
            />
          </View>

          <View style={{
            paddingTop: '40%',
          }}>
            <CustomeButton width={width / 1.1} onpress={() => OnDateOnBirthScreen(name)}
              title={'Continue'} />
          </View>

          <View style={{
            paddingTop: 10,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
          </View>


        {/* 
        <View style={styles.footer}>

        </View> */}
      </View>



    </SafeAreaView>
  )
}

export default NameScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  contentContainer: {
    height: '100%',
    alignItems: 'center',
  },
  footer: {
    height: '20%',
    alignItems: 'center'
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
    padding: 0,
    backgroundColor: COLORS.transparent,
    color: COLORS.gray,
    height: 40,
    width: 300,
    justifyContent: "center"
  },
})