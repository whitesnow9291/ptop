
import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Content from './components/Content';
import { CHORDS } from '../assets/chords';
import Text from './components/Text'
import { COLORS } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { CustomAdMobBanner } from './components/Admob';

const styles = StyleSheet.create({
    chordItem: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 0.2
    }
})
const ITEM_HEIGHT = 30
export const ChordListScreen = (props) => {
    const navigation = useNavigation()
    const limitedChords = CHORDS.slice(0, 5)
    const onNavigateToChordDetail = (chord) => {
        navigation.navigate('ChordDetailScreen', chord = { chord })
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.chordItem} onPress={() => onNavigateToChordDetail(item)}>
            <Text>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <Content style={{flex: 1}}>
            <CustomAdMobBanner />
            <View style={{flex: 1}}>
                <FlatList
                    data={limitedChords}
                    renderItem={renderItem}
                    keyExtractor={item => String(item.id)}
                />
            </View>
        </Content>
    );
}