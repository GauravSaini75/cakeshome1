import React from 'react';
import { View, Text, StatusBar, TextInput } from 'react-native';
import { RootStackParamList } from '../route/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '../components';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { styles } from '../theme/Style';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>
const LoginScreen = ({navigation, route}: Props): JSX.Element => {
    const countryCode = '+91';
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false)

    const onSendCode = async () => {
        if(!phoneNumber || phoneNumber.length > 10) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: '10 digit mobile number is required.',
                autoHide: true,
                visibilityTime: 5000,
            })
            return
        }
        setLoading(true)
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://staging.fastor.in/v1/pwa/user/register',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : {
                phone: phoneNumber,
                dial_code: countryCode
            }
        };
        try {
            const { data } = await axios.request(config)
            if(data.status_code == 200) {
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: data?.data?.toUpperCase() || 'OTP sent successfully',
                    autoHide: true,
                    visibilityTime: 2500,
                })
                navigation.navigate('LoginOtp', { data: { phone: phoneNumber, dial_code: countryCode} })
            } else {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: data?.error || 'There is some error, please try later.',
                    autoHide: true,
                    visibilityTime: 5000,
                })
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'There is some error, please try later.',
                autoHide: true,
                visibilityTime: 5000,
            })
        } finally {
            setLoading(false)
        }
    }

    return <>
        <StatusBar backgroundColor={colors.white} barStyle={'dark-content'}/>
        <KeyboardAwareScrollView contentContainerStyle={styles.authBackground}>
            <Text style={styles.textLarge} >Enter your mobile number</Text>
            <Text style={styles.textThinSmall}>We will send you the 6 digit varifiction code</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20
                }}>
                <View style={{
                        backgroundColor: colors.smoke,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 12,
                        borderWidth: 0.6,
                        borderRadius: 8,
                        borderColor: colors.grey3,
                        width: '20%'
                    }}>
                    <Text style={{ color: colors.grey3 }}>{countryCode}</Text>
                </View>
                <TextInput placeholder='Enter your phone number' style={{
                        backgroundColor: colors.smoke,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 12,
                        borderWidth: 0.6,
                        borderRadius: 8,
                        borderColor: colors.grey3,
                        width: '76%'
                    }}
                    keyboardType='phone-pad'
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    multiline={false}
                    maxLength={10}
                    placeholderTextColor={colors.grey3}
                />
            </View>
            <Button label='Send Code' onPress={()=>onSendCode()} loading={loading} />
        </KeyboardAwareScrollView>
    </>
}

export { LoginScreen }