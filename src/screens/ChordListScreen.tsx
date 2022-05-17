
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Content from './components/Content';
import { CHORDS } from '../assets/chords';
import Text from './components/Text'
import { COLORS } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { CustomAdMobBanner } from './components/Admob';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { PURCHASE_ADS_ID } from '@app/assets/constants';

const styles = StyleSheet.create({
    chordItem: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 0.2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
const ITEM_HEIGHT = 30
export const ChordListScreen = (props) => {
    const navigation = useNavigation()
    const userData = useSelector(state => state.user)
    const purchasedProducts = userData.purchased_products || []
    const [purchasedAd, setPurchasedAd] = useState(false)

    useEffect(() => {
        const hasAdPurchased = purchasedProducts.filter(p => p.productId == PURCHASE_ADS_ID)
        if (hasAdPurchased) {
            setPurchasedAd(true)
            navigation.setOptions({
                headerRight: null
            })
        }
    }, [purchasedProducts])

    const limitedChords = CHORDS.sort((a, b) => {
        return a.label > b.label
    })
    const onNavigateToChordDetail = (chord) => {
        navigation.navigate('ChordDetailScreen', chord = { chord })
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.chordItem}
            onPress={() => onNavigateToChordDetail(item)}>
            <Text>{item.label}</Text>
            <Ionicons name="chevron-forward-outline" size={32} color='gray' />
        </TouchableOpacity>
    );

    return (<SafeAreaView style={{ flex: 1, }} edges={['right', 'bottom', 'left']}>
        <Content style={{ flex: 1 }}>
            {!purchasedAd && <CustomAdMobBanner />}
            <View style={{ flex: 1 }}>
                <FlatList
                    data={limitedChords}
                    renderItem={renderItem}
                    keyExtractor={item => String(item.id)}
                />
            </View>
        </Content>
    </SafeAreaView>
    );
}