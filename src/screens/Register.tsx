import React from 'react';
import { View, Text } from 'react-native';
import { RootStackParamList } from '../route/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>

const Register = ({navigation, route}: Props): JSX.Element => {
  return (
    <View>
      <Text>Register</Text>
    </View>
  )
}

export { Register }