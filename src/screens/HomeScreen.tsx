import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, FlatList, ScrollView, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../route/types';
import { styles } from '../theme/Style';
import { colors } from '../theme/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Match } from '../store/matchs/types';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
const HomeScreen = ({navigation, route}: Props): JSX.Element => {

    const { user } = useSelector(({ auth }: RootState) => auth);
	const [restaurantList, setRestaurantList] = React.useState([]);
	const [loading, setLoading] = React.useState<boolean>(true);

	const getData = async () => {
		setLoading(true)
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: 'https://staging.fastor.in/v1/m/restaurant?city_id=118&&',
			headers: { 
				'Authorization': user?.token || ''
			}
		};
		try {
			const { data } = await axios.request(config);
			setRestaurantList(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}

	React.useEffect(() => {
	    getData()
	}, [])
	

	const _renderItem = ({item, index}: {item: any, index: number}) => {
		return (
		<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ItemDetails', { item: item })} key={index} style={{ marginHorizontal: 16, marginVertical: 8,  flexDirection: 'row', backgroundColor: colors.white, borderRadius: 12}}>
			{item.image || item.images[0].url ?
			    <Image source={{uri: item.image || item.images[0].url }} style={{height: 110, width: 110, borderRadius: 12}}/>
				:
				<View style={{height: 110, width: 110, borderRadius: 12, backgroundColor: colors.smoke}}></View>
			}
			<View style={{ flex: 1, paddingHorizontal: 16}}>
				<Text style={{ fontSize: 16, letterSpacing: 0.5, color: colors.black, fontWeight: '600' }}>{item.restaurant_name}</Text>
				<Text style={{ fontSize: 12, letterSpacing: 0.5, color: colors.grey3}}>{'Cakes, Pastry, Pastas'}</Text>
				<Text numberOfLines={1} style={{ fontSize: 12, letterSpacing: 0.5, color: colors.grey3}}>{item.location?.location_address || 'Delhi'}</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
					<Icon name='logo-slack' color={colors.primary} size={16}/>
					<Text style={{ fontSize: 14, letterSpacing: 0.5, color: colors.primary, fontWeight: '600' }}> 4 offers trending</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
					<View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name='star' size={12} color={colors.black}/>
							<Text style={{ fontSize: 14, color: colors.black, fontWeight: '600', marginLeft: 4}}>{item.rating?.restaurant_avg_rating+'.4' || '4.4'}</Text>
						</View>
						<Text style={{ fontSize: 12, color: colors.grey3, fontWeight: '300'}} >popularity</Text>
					</View>
					<View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 14, color: colors.black, fontWeight: '600', marginLeft: 4}}>$ {item.avg_cost_for_two || '199'}</Text>
						</View>
						<Text style={{ fontSize: 12, color: colors.grey3, fontWeight: '300'}} >cost for two</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
		)
	}

	const _listEmptyComponent = () => {
		return <>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={styles.message}>No item found.</Text>
			</View>
		</>
	}

    return <>
	    <StatusBar backgroundColor={colors.white} barStyle={'dark-content'}/>
		<View style={styles.container}>
			<View style={{ width: '100%', elevation: 4, backgroundColor: colors.white, padding: 18 }}>
				<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
					<Text style={{ letterSpacing: 0.5, fontSize: 16, fontWeight: '500'}}>Pre order from</Text>
					<Icon name='person-outline' size={18} color={colors.black} style={{marginLeft: 6, marginBottom:2}}/>
				</View>
				<Text style={{ letterSpacing: 0.7, fontSize: 18, color: colors.black, fontWeight: '600'}}>Connaught Place</Text>
			</View>
			{loading ?
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size={'large'} color={colors.primary} />
				</View>
				:
				<ScrollView style={{ flexGrow: 1 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' }}>
						<View style={{ backgroundColor: colors.smoke, padding: 12, borderRadius: 12, width: 160, height: 160, justifyContent: 'flex-end' }}>
							<Text style={{ fontSize: 24, letterSpacing: 0.8, color: colors.grey3, fontWeight: '600', marginBottom: 4 }}>Karan</Text>
							<Text style={{ fontSize: 16, color: colors.black, fontWeight: '600', marginBottom: 8 }}>Let's explore this evening</Text>
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
							<View style={{ alignItems: 'center'}}>
								<TouchableOpacity activeOpacity={0.6} style={{ height: 50, width: 50, elevation: 6, backgroundColor: colors.primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='logo-slack' color={colors.white} size={28}/>
								</TouchableOpacity>
								<Text style={{ color: colors.grey2, fontWeight: '600', fontSize: 16, marginTop: 2 }}>Offers</Text>
							</View>
							<View style={{ alignItems: 'center'}}>
								<TouchableOpacity activeOpacity={0.6} style={{ height: 50, width: 50, elevation: 6, backgroundColor: colors.link, borderRadius: 10, justifyContent: 'center', alignItems: 'center'  }}>
									<Icon name='wallet' color={colors.white} size={28}/>
								</TouchableOpacity>
								<Text style={{ color: colors.grey2, fontWeight: '600', fontSize: 16, marginTop: 2 }}>Wallet</Text>
							</View>
						</View>
					</View>
					<Text style={{ fontSize: 20, letterSpacing: 0.8, color: colors.black, fontWeight: '600', marginBottom: 4, marginLeft: 16 }}>Popular Ones</Text>
					{restaurantList.length ?
						restaurantList.map((item: any,index: number) => {
							return _renderItem({item, index})
						})
						:
						_listEmptyComponent()
					}
				</ScrollView>
			}
		</View>
    </>
}

export { HomeScreen };