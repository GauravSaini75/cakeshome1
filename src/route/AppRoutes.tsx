import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './types';
import { HomeScreen, ItemDetails } from '../screens';

const AppStack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes = (): JSX.Element => {
    return (
        <AppStack.Navigator initialRouteName={'HomeScreen'} screenOptions={{ headerShown: false, gestureEnabled: true, animation: 'slide_from_right' }}>
            <AppStack.Screen name='HomeScreen' component={HomeScreen}  />
            <AppStack.Screen name='ItemDetails' component={ItemDetails}  />
        </AppStack.Navigator>
    )
}

export default AppRoutes