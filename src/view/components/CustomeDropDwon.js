import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
const { width, height } = Dimensions.get('window')

const CustomeDropDwon = ({navigation,title, data, value, setValue , valueVisibale, setValueVisibale}) => {
    return (
        <View>
            <View style={{
                paddingTop: 20
            }}>
                <Text style=
                    {{
                        fontSize: 16,
                        color: COLORS.black,
                        fontWeight: 'bold'
                    }}>{title}</Text>
            </View>

            <View style={{
                backgroundColor: COLORS.light,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 10,
            }}>
                <TextInput
                    placeholder='Select'
                    value={value}
                    onChangeText={text => setValue(text)}
                />
                <TouchableOpacity
                    onPress={() => setValueVisibale(!valueVisibale)}
                >
                    {valueVisibale ?
                        <Image
                            source={require('../../assets/goback.png')}
                            resizeMode='contain'
                            style={{
                                width: 12,
                                height: 12,
                                tintColor: COLORS.black,
                                transform: [{ rotateZ: '90deg' }]
                            }}
                        />
                        :
                        <Image
                            source={require('../../assets/goback.png')}
                            resizeMode='contain'
                            style={{
                                width: 12,
                                height: 12,
                                tintColor: COLORS.black,
                                transform: [{ rotateZ: '-90deg' }]
                            }}
                        />
                    }
                </TouchableOpacity>
            </View>
            {valueVisibale &&
                <View style={{
                    backgroundColor: COLORS.white,
                    elevation: 4,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    marginTop: 5,
                }}>
                    {data.map((j, i) => (
                        <TouchableOpacity
                            onPress={(value) => { setValue(data[i].name), setValueVisibale(false) }}
                            key={i} style={{
                                height: height / 15,
                                justifyContent: 'center',
                                // backgroundColor:COLORS.main
                            }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 13,
                            }}>{j.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            }
        </View>
    )
}

export default CustomeDropDwon

const styles = StyleSheet.create({})