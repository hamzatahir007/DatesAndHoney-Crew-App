import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import SVGmenu from '../../assets/menu3.svg'

const HeaderTabTwo = ({ Lefticon, logo, onpress, navigation }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      height: 80,
      paddingHorizontal: 20,
    }}>
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <SVGmenu width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, alignItems: 'center' }}>
        <Image source={require('../../assets/heart.png')} resizeMode='contain'
          style={{
            height: 30,
            tintColor: COLORS.main,
          }} />
      </View>

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={onpress}>
          <Image source={require('../../assets/editprofile.png')} resizeMode='contain'
            style={{
              height: 20
            }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HeaderTabTwo