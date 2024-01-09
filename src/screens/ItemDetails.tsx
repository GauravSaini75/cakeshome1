import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../route/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/Colors';

const windowWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetails'>
const ItemDetails = ({navigation, route}: Props): JSX.Element => {
    const { item } = route.params
    return <>
        <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'}/>
        <View style={{ flex: 1 }}>
            <ImageBackground source={{ uri: item.image || item.images[0].url}} style={{ width: windowWidth, height: windowWidth + 100 }} resizeMode='cover'>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()} style={{
                    marginLeft: 24,
                    marginTop: 40,
                    borderWidth: 0.6,
                    borderColor: colors.white,
                    borderRadius: 8,
                    padding: 12,
                    alignSelf: 'flex-start',
                    backgroundColor: 'rgba(255,255,255,0.4)'
                }}>
                    <Icon name='chevron-back' color={colors.black} size={24} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={{ flex: 1, marginTop: -24, backgroundColor: colors.white, borderRadius: 16, padding: 16, paddingHorizontal: 24 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ width: '74%'}}>
                        <Text style={{ fontSize: 24, letterSpacing: 0.5, color: colors.black, fontWeight: '600' }}>{item.restaurant_name}</Text>
                        <Text numberOfLines={3} style={{ fontSize: 18, color: colors.black }}>{item.location?.location_address || 'Delhi'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '24%', justifyContent: 'flex-end', paddingVertical: 8, alignItems: 'center' }}>
                        <Icon name='star-outline' size={24} color={colors.grey3}/>
                        <Text style={{ color: colors.grey3, fontSize: 16}}>  4.4</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
					<Icon name='logo-slack' color={colors.primary} size={16}/>
					<Text style={{ fontSize: 14, letterSpacing: 0.5, color: colors.primary, fontWeight: '400' }}>  4 offers trending</Text>
				</View>
                <Text style={{ fontSize: 16, color: colors.black, marginTop: 12 }}>Our delicate vanila cake swirled with chocolate and filled with macha chocolate chip cream and a layer of dark chocolate ganache.</Text>
            </View>
        </View>
    </>
}

export { ItemDetails }