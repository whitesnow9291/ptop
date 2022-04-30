
import * as React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { CHORDS } from '../assets/chords';
import { COLORS } from '../assets/colors';
import Text from './components/Text'
const styles = StyleSheet.create({
    container: {

    },
    chordItem: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 0.2
    },
    imageStyle: {
        width: '100%',
    }
})
export const ChordDetailScreen = (props) => {
    const { chord } = props.route.params
    console.info(chord.label)
    const renderItem = ({ item }) => {
        return (
            <View style={styles.chordItem}>
                <Image source={item} style={styles.imageStyle} resizeMode="contain" />
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList
                renderItem={renderItem}
                data={chord.images}
                keyExtractor={(item, index) => String(index)}
            />
        </View>
    );
}