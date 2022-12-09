
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../assets/colors';
import ApplyCoupon from './components/ApplyCoupon';
import Content from './components/Content';
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
            <ApplyCoupon />
            <PurchaseAds />
        </Content>
    </SafeAreaView>
    );
}