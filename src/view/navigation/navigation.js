import React, { useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
//Mediator screens
import MediatorLoginWithNumberScreen from '../screens/MediatorLogin/LoginWithNumberScreen';
import MediatorLoginWithOTPScreen from '../screens/MediatorLogin/LoginWithOTPScreen';
import MediatorNameScreen from '../screens/MediatorLogin/NameScreen';
import MediatorDateOfBirthScreen from '../screens/MediatorLogin/DateOfBirthScreen';
import MediatorQuestionBioScreen from '../screens/MediatorLogin/QuestionBioScreen';
import MediatorQuestionPhotoScreen from '../screens/MediatorLogin/QuestionPhotoScreen';
import MediatorQuestionHaveKidsScreen from '../screens/MediatorLogin/QuestionHaveKidsScreen';
import MediatorLoginWithEmail from '../screens/MediatorLogin/LoginWithEmail';
import MediatorQuestionRelationshipStatus from '../screens/MediatorLogin/QuestionRelationshipStatus';
import MediatorQuestionRequestAcess from '../screens/MediatorLogin/QuestionRequestAcess';
import MediatoreQuestionRequestAcessOther from '../screens/MediatorLogin/QuestionRequestAcessOther';
import MediatorQuestionOrganizationScreen from '../screens/MediatorLogin/QuestionOrganizationScreen';


import { useDispatch, useSelector } from 'react-redux';
import { logout, mediatorLogin, selectMediatorUser, selectUser, status } from '../../../redux/reducers/Reducers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MediatorApprovalScreen from '../screens/MediatorLogin/MediatorApprovalScreen';
import MediatorMatchCoordinatorBT from './MediatorMatchCoordinatorBT';
import MediatorTalentAgencyBT from './MediatorTalentAgencyBT';
import MediatorEventAndFoodCoordinatorBt from './MediatorEventAndFoodCoordinatorBt';
import MediatorHumainResourcesBT from './MediatorHumainResourcesBT';
import MediatorLegalTeamBT from './MediatorLegalTeamBT';
import MediatorProfileOptimizerBT from './MediatorProfileOptimizerBT';
import MediatorEventStaffChekInBT from './MediatorEventStaffChekInBT';
import MediatorInfluencersBT from './MediatorInfluencersBT';
import MediatorInfluencersDrawer from './MediatorInfluencersDrawer';
import MediatorTalentAgencyDrawer from './MediatorTalentAgencyDrawer';
// import MediatorTalentAgencyDrawer from './MediatorTalentAgencyDrawer';
// import MediatorInfluencersDrawer from './MediatorInfluencersDrawer';


const Stack = createNativeStackNavigator();
// const MediatorUser = useSelector(selectMediatorUser);

const MyStack = () => {
    const [initializing, setInitializing] = useState(true);
    const [regester, setRegester] = useState();

    const dispatch = useDispatch();
    const regesterUser = useSelector(selectUser);
    const MediatorUser = useSelector(selectMediatorUser);
    // console.log('==>', MediatorUser);
    const [userExist, setUserExit] = useState()
    const [userData, setUserData] = useState()
    const [memberships, setMemberships] = useState();
    const [membershipUid, setMembershipUid] = useState();
    const [LoginMediatorAccess, setLoginMediatorAccess] = useState();

    const MadiatorStack = ({ navigation }) => (
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorLoginWithNumberScreen" component={MediatorLoginWithNumberScreen} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorLoginWithOTPScreen" component={MediatorLoginWithOTPScreen} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorNameScreen" component={MediatorNameScreen} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorDateOfBirthScreen" component={MediatorDateOfBirthScreen} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorLoginWithEmail" component={MediatorLoginWithEmail} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorQuestionPhotoScreen" component={MediatorQuestionPhotoScreen} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorQuestionBioScreen" component={MediatorQuestionBioScreen} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorQuestionHaveKidsScreen" component={MediatorQuestionHaveKidsScreen} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorQuestionOrganizationScreen" component={MediatorQuestionOrganizationScreen} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatoreQuestionRequestAcessOther" component={MediatoreQuestionRequestAcessOther} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorQuestionRelationshipStatus" component={MediatorQuestionRelationshipStatus} options={{
                unmountOnBlur: true
            }} />
            <Stack.Screen name="MediatorQuestionRequestAcess" component={MediatorQuestionRequestAcess} options={{
                unmountOnBlur: true
            }} />
        </Stack.Navigator>
    );

    const MediatorDashboardStack = ({ navigation }) => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MediatorApprovalScreen" component={MediatorApprovalScreen} />
            {MediatorUser?.userDetails?.MediatorId == 1 && MediatorUser?.userDetails?.PanelAccess == true &&
                <Stack.Screen name="MediatorInfluencersDrawer" component={MediatorInfluencersDrawer} />
                // <Stack.Screen name="MediatorInfluencersBT" component={MediatorInfluencersBT} />
            }
            {MediatorUser?.userDetails?.MediatorId == 2 && MediatorUser?.userDetails?.PanelAccess == true &&
                <Stack.Screen name="MediatorMatchCoordinatorBT" component={MediatorMatchCoordinatorBT} />
            }
            {MediatorUser?.userDetails?.MediatorId == 3 && MediatorUser?.userDetails?.PanelAccess == true &&
                <Stack.Screen name="MediatorEventStaffChekInBT" component={MediatorEventStaffChekInBT} />
            }
            {MediatorUser?.userDetails?.MediatorId == 5 && MediatorUser?.userDetails?.PanelAccess == true &&
                <Stack.Screen name="MediatorEventAndFoodCoordinatorBt" component={MediatorEventAndFoodCoordinatorBt} />
                // <Stack.Screen name="MediatorMatchCoordinatorBT" component={MediatorMatchCoordinatorBT} />
            }
            {MediatorUser?.userDetails?.MediatorId == 6 && MediatorUser?.userDetails?.PanelAccess == true &&
                <Stack.Screen name="MediatorProfileOptimizerBT" component={MediatorProfileOptimizerBT} />
                // <Stack.Screen name="MediatorMatchCoordinatorBT" component={MediatorMatchCoordinatorBT} />
            }
            {MediatorUser?.userDetails?.MediatorId == 9 && MediatorUser?.userDetails?.PanelAccess == true &&
                <Stack.Screen name="MediatorLegalTeamBT" component={MediatorLegalTeamBT} />
            }
            {MediatorUser?.userDetails?.MediatorId == 10 && MediatorUser?.userDetails?.PanelAccess == true &&
                <Stack.Screen name="MediatorTalentAgencyDrawer" component={MediatorTalentAgencyDrawer} />
                // <Stack.Screen name="MediatorTalentAgencyBT" component={MediatorTalentAgencyBT} />
            }
            {MediatorUser?.userDetails?.MediatorId == 11 && MediatorUser?.userDetails?.PanelAccess == true &&
                <Stack.Screen name="MediatorEventAndFoodCoordinatorBt" component={MediatorEventAndFoodCoordinatorBt} />
                // <Stack.Screen name="MediatorMatchCoordinatorBT" component={MediatorMatchCoordinatorBT} />
            }
            {MediatorUser?.userDetails?.MediatorId == 12 && MediatorUser?.userDetails?.PanelAccess == true &&
                <Stack.Screen name="MediatorHumainResourcesBT" component={MediatorHumainResourcesBT} />
                // <Stack.Screen name="MediatorMatchCoordinatorBT" component={MediatorMatchCoordinatorBT} />
            }
        </Stack.Navigator>
    )

    const OnLogOut = () => {
        // navigation.navigate('LoginScreen')
        try {
            auth()
                .signOut()
                .then(() =>
                    console.log('User signed out!'),
                    // ToastAndroid.show('Signed out!', ToastAndroid.SHORT),
                    //   navigation.navigate('LoginScreen')
                );
            // const userData = await AsyncStorage.getItem('session');
            //   await AsyncStorage.removeItem('CurrentUserData')
            //   await AsyncStorage.removeItem('CurrentUser')
            dispatch(logout());
        }
        catch (exception) {
            return false;
        }
    }


    function onAuthStateChanged(user) {
        console.log('user: ', user);
        if (user) {
            firestore().collection('Users')
                .doc(user?.uid)
                .onSnapshot(documentSnapshot => {
                    console.log(documentSnapshot.exists);
                    if (documentSnapshot.exists) {
                        const data = documentSnapshot.data()
                        if (data?.userDetails?.Category == 'Mediator') {
                            // console.log(user.uid);
                            dispatch(mediatorLogin(data))
                            // MediatorUserLogin(user.uid);
                        }
                        else if (!data?.userDetails?.Category != 'Mediator') {
                            // console.log('=>',data);
                            OnLogOut()
                            ToastAndroid.show("This account is already used in the Main app.", ToastAndroid.SHORT);
                        }
                    }
                    else {
                        dispatch(mediatorLogin(null))
                        console.log('user not exit');
                    }
                });
        }
        else {
            // dispatch(login(null))
            console.log('user not found');
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    if (initializing) return null;



    if (!MediatorUser) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorLoginWithNumberScreen" component={MediatorLoginWithNumberScreen} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorLoginWithOTPScreen" component={MediatorLoginWithOTPScreen} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorNameScreen" component={MediatorNameScreen} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorDateOfBirthScreen" component={MediatorDateOfBirthScreen} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorLoginWithEmail" component={MediatorLoginWithEmail} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorQuestionPhotoScreen" component={MediatorQuestionPhotoScreen} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorQuestionBioScreen" component={MediatorQuestionBioScreen} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorQuestionHaveKidsScreen" component={MediatorQuestionHaveKidsScreen} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorQuestionOrganizationScreen" component={MediatorQuestionOrganizationScreen} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatoreQuestionRequestAcessOther" component={MediatoreQuestionRequestAcessOther} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorQuestionRelationshipStatus" component={MediatorQuestionRelationshipStatus} options={{
                        unmountOnBlur: true
                    }} />
                    <Stack.Screen name="MediatorQuestionRequestAcess" component={MediatorQuestionRequestAcess} options={{
                        unmountOnBlur: true
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MediatorDashboardStack" component={MediatorDashboardStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default MyStack