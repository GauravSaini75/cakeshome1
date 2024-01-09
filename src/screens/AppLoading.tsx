import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from '../theme/Style'
import { colors } from '../theme/Colors'

const AppLoading = (): JSX.Element => {
    return <>
        <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
            <ActivityIndicator color={colors.grey2}/>
            <Text style={styles.message}>Loading...</Text>
        </View>
    </>
}

export { AppLoading }