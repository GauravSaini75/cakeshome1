import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/Colors';

interface Props {
    length: number;
    onChange: (otp: string) => void;
}

const OtpInput = ({ length = 6, onChange }: Props) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputRefs = useRef<TextInput[]>(Array(length).fill(null));  

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Joining all OTP digits and passing it to the parent component
        if (onChange) {
            onChange(newOtp.join(''));
        }

        // Focus next input or submit OTP on the last input
        if (value !== '' && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (index: number, key: string) => {
        if (key === 'Backspace' && index > 0 && otp[index] === '') {
        inputRefs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array(length)
                .fill('')
                .map((_, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChangeText={(value) => handleOtpChange(index, value)}
                    onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
                    ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
                />
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    input: {
        width: 50,
        height: 50,
        padding: 12,
        borderWidth: 0.6,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: colors.smoke
    },
});

export { OtpInput };