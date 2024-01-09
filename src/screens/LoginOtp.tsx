import React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../route/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../theme/Style';
import { Button, OtpInput } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { SET_TOKEN, SET_USER, User } from '../store/user/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginOtp'>
const LoginOtp = ({navigation, route}: Props): JSX.Element => {
    const { phone, dial_code } = route.params.data;
    const dispatch = useDispatch<AppDispatch>();
    const [otpValue, setOtpValue] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleOtpChange = (otp: string) => {
        setOtpValue(otp);
        console.log(otp)
    };

    const onVerifyCode = async () => {
        if(!otpValue || otpValue.length > 6) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: '6 digit OTP is required.',
                autoHide: true,
                visibilityTime: 5000,
            })
            return
        }
        setLoading(true)
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://staging.fastor.in/v1/pwa/user/login',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : { phone, dial_code, otp: otpValue}
        };
        try {
            const { data } = await axios.request(config)
            if(data.status_code == 200) {
                let user: User = data.data;
                await AsyncStorage.setItem('accesstoken', JSON.stringify({ 'token': data.data.token }));
                await AsyncStorage.setItem('user', JSON.stringify(user));
                dispatch({ type: SET_USER, payload: user});
                dispatch({ type: SET_TOKEN, payload: data.data.token });
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Login successfully.',
                    autoHide: true,
                    visibilityTime: 2500,
                })
                navigation.reset({
                    index:0,
                    routes:[{ name: 'RootAppStack' }]
                })
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
        <KeyboardAwareScrollView contentContainerStyle={[styles.authBackground, { justifyContent: 'flex-start' }]}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()} style={{
                marginLeft: 10,
                marginTop: 10,
                borderWidth: 0.6,
                borderColor: colors.grey2,
                borderRadius: 8,
                padding: 12,
                alignSelf: 'flex-start'
            }}>
                <Icon name='chevron-back' color={colors.black} size={24} />
            </TouchableOpacity>
            <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                <Text style={styles.textLarge} >OTP Verification</Text>
                <Text style={styles.textThinSmall}>Enter the verification code we just sent on your Mobile Number.</Text>
                <OtpInput length={6} onChange={handleOtpChange} />
                <Button label='Verify' onPress={()=>onVerifyCode()} loading={loading} />
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.linkText} >Don't received code? <Text style={{ color: colors.link }}>Resend</Text></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    </>
}

export { LoginOtp }