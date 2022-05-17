
import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Content from './components/Content';
import { CHORDS } from '../assets/chords';
import Text from './components/Text'
import { COLORS } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { CustomAdMobBanner } from './components/Admob';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PurchaseAds } from './components/PurchaseAds';

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
export const PurchaseAdScreen = (props) => {
    const navigation = useNavigation()

    return (<SafeAreaView style={{ flex: 1, }} edges={['right', 'bottom', 'left']}>
        <Content style={{ flex: 1 }}>
            <PurchaseAds />
        </Content>
    </SafeAreaView>
    );
}