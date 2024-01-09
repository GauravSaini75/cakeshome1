import React from 'react';
import { CommonActions, DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppScreens from './AppRoutes';
import { navigationRef } from './RootNavigation';
import { AppLoading, LoginOtp, LoginScreen } from '../screens';
import { RootStackParamList } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { checkUser } from '../store/user/actions';


const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<RootStackParamList>();
const SplashStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

const AppStackScreens = (): JSX.Element => {
    const navigation = useNavigation();
    React.useEffect(() => {
      const listener = navigation.addListener('blur', () => {
        navigation.dispatch({
          ...CommonActions.reset({
            index: 0,
            routes: [{ name: "DashboardStackScreen" }]
          })
        });
      })
      return () => { listener() }
    }, [])
    return <AppScreens />
  }

const AuthStackScreens = (): JSX.Element => {
    return (
        <AuthStack.Navigator initialRouteName={'LoginScreen'} screenOptions={{ headerShown: false, animation:'slide_from_right' }} >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="LoginOtp" component={LoginOtp} />
        </AuthStack.Navigator>
    )
}

const UserStackScreens = ({ user }:{user:any}): JSX.Element => {
    return(
        <UserStack.Navigator initialRouteName={ user ? 'RootAppStack' : 'RootAuthStack' } screenOptions={{ headerShown: false, animation:'slide_from_right' }} >
            <UserStack.Screen name='RootAuthStack' component={AuthStackScreens} options={{ animation:'slide_from_left' }}/>
            <UserStack.Screen name='RootAppStack' component={AppStackScreens} />
        </UserStack.Navigator>
    )
}

const LoadingSplash = (): JSX.Element => {
    return(
        <SplashStack.Navigator screenOptions={{ headerShown:false, animation:'slide_from_right' }}>
            <SplashStack.Screen name='AppLoading' component={AppLoading}/>
        </SplashStack.Navigator>
    )
}

const Root = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(({ auth }: RootState) => auth.user);
    const [loadingSplash, setLoadingSplash] = React.useState<boolean>(true);

    const initialiesData = () => {
        dispatch(checkUser(()=> setLoadingSplash(false)));
    }

    React.useEffect(() => {
        setTimeout(() => {
            initialiesData();
        }, 2500);
    }, [])
    

    return (
        <NavigationContainer
            ref={navigationRef}
            theme={{
                ...DefaultTheme,
                dark: false
            }}
        >
            {loadingSplash ?
                <LoadingSplash />
                :
                <UserStackScreens user={user} />
            }
        </NavigationContainer>
    );
}

export default Root