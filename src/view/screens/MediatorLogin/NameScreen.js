import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, ToastAndroid, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/reducers/Reducers';
import { TextInput } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
import auth from '@react-native-firebase/auth';


const MediatorNameScreen = ({ navigation }) => {
  const [name, setname] = useState(null);
  const [inputName, setInputName] = useState(false);
  // console.log(image1, image2, image3, image4, image5);

  const OnDateOnBirthScreen = (name) => {
    // console.log('test', name.length);
    // return
    if (name == null || name?.length < 5) {
      if (name == null) {
        ToastAndroid.show("Please enter your name!", ToastAndroid.SHORT);
        setInputName(true)
      }
      else if (name.length < 5) {
        setInputName(true)
        ToastAndroid.show("Fullname should be 5character log!", ToastAndroid.SHORT);
      }
    }
    else {
      // console.log('test', name.length);
      // return
      navigation.navigate('MediatorLoginWithEmail', { name: name })
    }
  }


  useEffect(() => {
    // Data fetch logic or any other side effect
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  function onAuthStateChanged(user) {
    if (!user) {
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            paddingTop: 40
          }}>
            <Image source={require('../../../assets/namescreen.png')} resizeMode='contain'
              style={{
                height: height / 8
              }}
            />
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
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter the full name</Text>
          </View>

          <View style={styles.NumberInput}>
            <TextInput
              value={name}
              error={inputName}
              underlineColor={COLORS.transparent}
              activeUnderlineColor={COLORS.transparent}
              onFocus={() => setInputName(false)}
              placeholder={'Full name'}
              placeholderTextColor={COLORS.gray}
              // error={inputfirstName}
              onChangeText={name => setname(name)
              }
              style={styles.TextInput}
            />
          </View>


        </View>


        <View style={styles.footer}>

          <View style={{
            paddingTop: 20,
          }}>
            <CustomeButton onpress={() => OnDateOnBirthScreen(name)}
              title={'Continue'} />
          </View>

          <View style={{
            paddingTop: 20,
            width: 310,
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

export default MediatorNameScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%'
  },
  NumberInput: {
    marginTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    color: COLORS.gray,
    height: 40,
    width: width / 1.1,
    justifyContent: "center"
  },
})