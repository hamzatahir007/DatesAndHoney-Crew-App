import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/Colors.js';
import MediatorTalentAgencyBT from './MediatorTalentAgencyBT.js';
import MediatorSubmitContentBT from './MediatorSubmitContentBT.js';
import DrawerContentForMediator from '../components/DrawerContentForMediator.js';



const Drawer = createDrawerNavigator();

const MediatorTalentAgencyDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Agency"
            drawerContent={props => <DrawerContentForMediator {...props} />}
            screenOptions={{
                headerShown: false,
                drawerInactiveBackgroundColor: '#3A485F',
                drawerActiveBackgroundColor: COLORS.main,
                drawerActiveTintColor: COLORS.gray,
                drawerInactiveTintColor: COLORS.white,
                drawerLabelStyle: {
                    // marginLeft: -25,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                },
                // drawerHideStatusBarOnOpen:true
            }}>
            <Drawer.Screen name="Agency" component={MediatorTalentAgencyBT}
            options={{ drawerLabel: 'Agency' }}
            />
            <Drawer.Screen name="Submit Content" component={MediatorSubmitContentBT}
            options={{ drawerLabel: 'Submit Content' }}
            />
            {/* <Drawer.Screen name="Premium Membership" component={ProfileScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="crown" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Support" component={SupportScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <AntDesign name="customerservice" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Rate Us" component={RateUsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="star" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="shield-key" size={22} color={color} />
                    ),
                }}
            /> */}
        </Drawer.Navigator>
    )
}

export default MediatorTalentAgencyDrawer