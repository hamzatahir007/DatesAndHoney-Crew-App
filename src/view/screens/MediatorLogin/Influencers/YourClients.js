import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../../../consts/Colors';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import Pie from 'react-native-pie';
import CustomeButton from '../../../components/CustomeButton';
import Twitter from '../../../../assets/Twitter.svg';
import Facebook from '../../../../assets/Facebook.svg';
import WhatsApp from '../../../../assets/WhatsApp.svg';
import Reddit from '../../../../assets/Reddit.svg';
import Linkedin from '../../../../assets/Linkedin.svg';
import TikTok from '../../../../assets/TikTok.svg';
import CopyLink from '../../../../assets/copy.svg';
import Edite from '../../../../assets/edit.svg'
import Send from '../../../../assets/send.svg'
import SVGImg1 from '../../../../assets/arrowleft.svg';
import SVGImg2 from '../../../../assets/diamond.svg';
import Gold from '../../../../assets/gold.svg';

import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import YourClinets from '../../../components/YourClinets';

const { width, height } = Dimensions.get("window");

const data4 = [
    {
        id: 1,
        name: 'Jan',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 15,
        type: 'Diamond'
    },
    {
        id: 2,
        name: 'Roy',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 15,
        type: 'Diamond'
    },
    {
        id: 3,
        name: 'Mendela',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 390,
        type: 'Gold'
    },
    {
        id: 4,
        name: 'Sam',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 390,
        type: 'Gold'
    },
    {
        id: 5,
        name: 'Arun',
        img: require('../../../../assets/profilepic.png'),
        yourEarning: 380,
        ClientEarning: 390,
        type: 'Gold'
    }
]

const YourClients = ({ navigation, route }) => {
    const { DimaondUsers, GoldUsers, SilverUsers, NormalUsers } = route?.params;
    const [emailAddress, setEmailAddress] = useState(null);
    const [customeCode, setCustomeCode] = useState(null);
    // console.log(data);
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.light,
            // paddingHorizontal:20
            marginBottom: 30,
        }}>
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 20,
                alignItems: 'center',
                backgroundColor: COLORS.white
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        flex: 1,
                    }}>
                    <SVGImg1 width={20} height={20} />
                </TouchableOpacity>
                <View style={{
                    flex: 2,
                }}>
                    <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>Your Clients</Text>
                </View>
                <View style={{
                    flex: 1,
                }}>
                </View>
            </View>
            <ScrollView>
                {DimaondUsers?.length > 0 || GoldUsers?.length > 0 || SilverUsers?.length > 0 || NormalUsers?.length > 0 ?
                    <View>
                        {DimaondUsers?.length > 0 &&
                            <View>
                                <View style={{
                                    backgroundColor: COLORS.white
                                }}>
                                    <View style={{
                                        paddingHorizontal: 20,
                                        paddingTop: 10,
                                        paddingBottom: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            paddingRight: 5,
                                        }}>Diamond/Diamond+</Text>
                                        <SVGImg2 width={20} height={20} />
                                    </View>
                                </View>

                                {DimaondUsers.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            paddingVertical: 20,
                                            backgroundColor: COLORS.white,
                                            width: width,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                        }}>
                                        <View style={{
                                            borderWidth: 2,
                                            borderRadius: 50,
                                            borderColor: COLORS.main,
                                            alignItems: 'center',
                                        }}>
                                            <Image source={{ uri: item?.image }} resizeMode='cover' style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                            }} />
                                        </View>
                                        <View style={{
                                            width: '60%',
                                            paddingHorizontal: 10,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                // width: '50%'
                                                justifyContent: 'space-between'
                                            }}>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    width: '50%',
                                                    paddingBottom: 5
                                                    // backgroundColor: COLORS.gray2
                                                }}>
                                                    <View style={{
                                                        paddingRight: 5
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 15,
                                                            fontWeight: '500',
                                                            color: COLORS.black
                                                        }}>{item.name}</Text>
                                                    </View>
                                                    <View style={{ paddingRight: 5 }}>
                                                        <SVGImg2 width={20} height={20} />
                                                    </View>
                                                    <View style={{
                                                        // paddingLeft: 5
                                                    }}>
                                                        <Text style={{ fontSize: 12, color: COLORS.black }}>{item.MemberShipType}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                // onPress={() => DeclineClientReq(item)}
                                                style={{
                                                    alignSelf: 'flex-start',
                                                    paddingHorizontal: 10,
                                                    // width: '95%',
                                                    // paddingHorizontal: 40,
                                                    paddingVertical: 5,
                                                    borderRadius: 5,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.gray,
                                                    backgroundColor: COLORS.transparent,
                                                }}>
                                                <Text style={{
                                                    color: COLORS.gray,
                                                    fontSize: 12,
                                                    textAlign: 'center'
                                                }}>
                                                    Total Cost : <Text style={{ color: COLORS.green }}>${item.TotalTicketPrice}</Text>
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            width: '20%',
                                            // backgroundColor: COLORS.main,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>You will earn</Text>
                                            <Text style={{
                                                color: COLORS.main,
                                                fontWeight: 'bold'
                                            }}>
                                                ${item.PromoterReward} </Text>
                                        </View>

                                    </View>
                                ))}
                            </View>
                        }

                        {GoldUsers?.length > 0 &&
                            <View>
                                <View style={{
                                    marginTop: 5,
                                    backgroundColor: COLORS.white,
                                }}>
                                    <View style={{
                                        paddingHorizontal: 20,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // justifyContent:'center'
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            paddingRight: 5
                                        }}>Gold</Text>
                                        <Gold width={20} height={20} />
                                    </View>
                                </View>
                                {GoldUsers.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            paddingVertical: 20,
                                            backgroundColor: COLORS.white,
                                            width: width,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                        }}>
                                        <View style={{
                                            borderWidth: 2,
                                            borderRadius: 50,
                                            borderColor: COLORS.main,
                                            alignItems: 'center',
                                        }}>
                                            <Image source={{ uri: item?.image }} resizeMode='cover' style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                            }} />
                                        </View>
                                        <View style={{
                                            width: '60%',
                                            paddingHorizontal: 10,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                // width: '50%'
                                                justifyContent: 'space-between'
                                            }}>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    width: '50%',
                                                    paddingBottom: 5
                                                    // backgroundColor: COLORS.gray2
                                                }}>
                                                    <View style={{
                                                        paddingRight: 5
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 15,
                                                            fontWeight: '500',
                                                            color: COLORS.black
                                                        }}>{item.name}</Text>
                                                    </View>
                                                    <View style={{ paddingRight: 5 }}>
                                                        <Gold width={20} height={20} />
                                                    </View>
                                                    <View style={{
                                                        // paddingLeft: 5
                                                    }}>
                                                        <Text style={{ fontSize: 12, color: COLORS.black }}>{item?.MemberShipType}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                // onPress={() => DeclineClientReq(item)}
                                                style={{
                                                    alignSelf: 'flex-start',
                                                    paddingHorizontal: 10,
                                                    // width: '95%',
                                                    // paddingHorizontal: 40,
                                                    paddingVertical: 5,
                                                    borderRadius: 5,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.gray,
                                                    backgroundColor: COLORS.transparent,
                                                }}>
                                                <Text style={{
                                                    color: COLORS.gray,
                                                    fontSize: 12,
                                                    textAlign: 'center'
                                                }}>
                                                    Total Cost : <Text style={{ color: COLORS.green }}>${item?.TotalTicketPrice}</Text>
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            width: '20%',
                                            // backgroundColor: COLORS.main,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>You will earn</Text>
                                            <Text style={{
                                                color: COLORS.main,
                                                fontWeight: 'bold'
                                            }}>
                                                ${item?.PromoterReward} </Text>
                                        </View>

                                    </View>
                                ))}
                            </View>
                        }


                        {SilverUsers?.length > 0 &&
                            <View>
                                <View style={{
                                    marginTop: 5,
                                    backgroundColor: COLORS.white,
                                }}>
                                    <View style={{
                                        paddingHorizontal: 20,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // justifyContent:'center'
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            paddingRight: 5,
                                        }}>Silver</Text>
                                        <Image source={require('../../../../assets/unlock.png')} resizeMode='contain' style={{
                                            width: 15, height: 15, tintColor: COLORS.gray2,
                                        }}
                                        />
                                    </View>
                                </View>
                                {SilverUsers.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            paddingVertical: 20,
                                            backgroundColor: COLORS.white,
                                            width: width,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                        }}>
                                        <View style={{
                                            borderWidth: 2,
                                            borderRadius: 50,
                                            borderColor: COLORS.main,
                                            alignItems: 'center',
                                        }}>
                                            <Image source={{ uri: item?.image }} resizeMode='cover' style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                            }} />
                                        </View>
                                        <View style={{
                                            width: '60%',
                                            paddingHorizontal: 10,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                // width: '50%'
                                                justifyContent: 'space-between'
                                            }}>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    width: '50%',
                                                    paddingBottom: 5,
                                                    // backgroundColor: COLORS.gray2
                                                }}>
                                                    <View style={{
                                                        paddingRight: 5
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 15,
                                                            fontWeight: '500',
                                                            color: COLORS.black
                                                        }}>{item.name}</Text>
                                                    </View>
                                                    <View style={{ paddingRight: 5 }}>
                                                        <Image source={require('../../../../assets/unlock.png')} resizeMode='contain' style={{
                                                            width: 15, height: 15, tintColor: COLORS.gray2,
                                                        }}
                                                        />
                                                    </View>
                                                    <View style={{
                                                        // paddingLeft: 5
                                                    }}>
                                                        <Text style={{ fontSize: 12, color: COLORS.black }}>{item?.MemberShipType}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                // onPress={() => DeclineClientReq(item)}
                                                style={{
                                                    alignSelf: 'flex-start',
                                                    paddingHorizontal: 10,
                                                    // width: '95%',
                                                    // paddingHorizontal: 40,
                                                    paddingVertical: 5,
                                                    borderRadius: 5,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.gray,
                                                    backgroundColor: COLORS.transparent,
                                                }}>
                                                <Text style={{
                                                    color: COLORS.gray,
                                                    fontSize: 12,
                                                    textAlign: 'center'
                                                }}>
                                                    Total Cost : <Text style={{ color: COLORS.green }}>${item?.TotalTicketPrice}</Text>
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            width: '20%',
                                            // backgroundColor: COLORS.main,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>You will earn</Text>
                                            <Text style={{
                                                color: COLORS.main,
                                                fontWeight: 'bold'
                                            }}>
                                                ${item?.PromoterReward} </Text>
                                        </View>

                                    </View>
                                ))}
                            </View>
                        }


                        {NormalUsers?.length > 0 &&
                            <View>
                                <View style={{
                                    marginTop: 5,
                                    backgroundColor: COLORS.white,
                                }}>
                                    <View style={{
                                        paddingHorizontal: 20,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // justifyContent:'center'
                                    }}>
                                        <Image source={require('../../../../assets/dot.png')} resizeMode='contain' style={{
                                            width: 5, height: 5, paddingRight: 15
                                        }}
                                        />
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            paddingRight: 5
                                        }}>Normal</Text>
                                    </View>
                                </View>
                                {NormalUsers.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            paddingVertical: 20,
                                            backgroundColor: COLORS.white,
                                            width: width,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                        }}>
                                        <View style={{
                                            borderWidth: 2,
                                            borderRadius: 50,
                                            borderColor: COLORS.main,
                                            alignItems: 'center',
                                        }}>
                                            <Image source={{ uri: item?.image }} resizeMode='cover' style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                            }} />
                                        </View>
                                        <View style={{
                                            width: '60%',
                                            paddingHorizontal: 10,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                // width: '50%'
                                                justifyContent: 'space-between'
                                            }}>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    width: '50%',
                                                    paddingBottom: 5,
                                                    // backgroundColor: COLORS.gray2
                                                }}>
                                                    <View style={{
                                                        paddingRight: 5
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 15,
                                                            fontWeight: '500',
                                                            color: COLORS.black
                                                        }}>{item.name}</Text>
                                                    </View>
                                                    <View style={{ paddingRight: 5 }}>
                                                        <Image source={require('../../../../assets/dot.png')} resizeMode='contain' style={{
                                                            width: 5, height: 5, paddingRight: 5
                                                        }}
                                                        />
                                                    </View>
                                                    <View style={{
                                                        // paddingLeft: 5
                                                    }}>
                                                        <Text style={{ fontSize: 12, color: COLORS.black }}>{item?.MemberShipType}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                // onPress={() => DeclineClientReq(item)}
                                                style={{
                                                    alignSelf: 'flex-start',
                                                    paddingHorizontal: 10,
                                                    // width: '95%',
                                                    // paddingHorizontal: 40,
                                                    paddingVertical: 5,
                                                    borderRadius: 5,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.gray,
                                                    backgroundColor: COLORS.transparent,
                                                }}>
                                                <Text style={{
                                                    color: COLORS.gray,
                                                    fontSize: 12,
                                                    textAlign: 'center'
                                                }}>
                                                    Total Cost : <Text style={{ color: COLORS.green }}>${item?.TotalTicketPrice}</Text>
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            width: '20%',
                                            // backgroundColor: COLORS.main,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: COLORS.black
                                            }}>You will earn</Text>
                                            <Text style={{
                                                color: COLORS.main,
                                                fontWeight: 'bold'
                                            }}>
                                                ${item?.PromoterReward} </Text>
                                        </View>

                                    </View>
                                ))}
                            </View>
                        }
                    </View>
                    :
                    <View style={{
                        // flex:1,
                        backgroundColor: COLORS.white,
                        height: '100%',
                        paddingHorizontal: 20,
                        alignItems: 'center',
                    }}>
                        <View style={{
                            top: '20%',
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray,
                            }}>Currently, You don't have any clients who are using your referral code to purchase event tickets. It is recommended to refer other people so that they can use your referral code. This way, more people will be encouraged to use your code.</Text>
                            <View style={{
                                alignSelf: 'center',
                                marginTop: 20,
                            }}>
                                <CustomeButton width={width / 3} title={'Go Back'} onpress={() => navigation.goBack()} />
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>

        </View>
    )
}

export default YourClients


const styles = StyleSheet.create({
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        // top:'60%',
        // backgroundColor:COLORS.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: 'red',
        fontSize: 12,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
})