import React from 'react';
import { ActivityIndicator, ColorValue, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { colors } from '../theme/Colors';
import { styles } from '../theme/Style';

interface Props extends TouchableOpacityProps {
    activeOpacity?: number;
    children?:      React.ReactNode;
    label?:         string;
    labelStyle?:    TextStyle | TextStyle[];
    labelColor?:    ColorValue;
    loading?:       boolean;
    loadingText?:   boolean;
    onPress?:       () => void;
    style?:         ViewStyle | ViewStyle[];
    disabled?:      boolean;
}

const Button = React.forwardRef<TouchableOpacity, Props>((props: Props, ref) => {
    let { label = "Button", labelColor = colors.white, labelStyle, loading, loadingText = true, onPress, activeOpacity = 0.7, children, style, disabled } = props;

    return (
        <TouchableOpacity ref={ref} activeOpacity={activeOpacity} style={[styles.button, { backgroundColor: colors.primary, opacity: loading ? 0.8 : 1 }, style ]} onPress={onPress} disabled={loading || disabled} >
            { children ? children :
                <>
                    {loading ?
                        <ActivityIndicator size='small' color={labelColor} />
                        :
                        <Text style={[ styles.buttonLabel, labelStyle, {color: labelColor}]}>
                            {label}
                        </Text>
                    }
                </>
            }
        </TouchableOpacity>
    )
});

export { Button }