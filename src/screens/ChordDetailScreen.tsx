
import * as React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../assets/colors';
import Text from './components/Text'
import { WebView } from 'react-native-webview';
const styles = StyleSheet.create({
    container: {

    },
    chordItem: {
        backgroundColor: COLORS.white,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 0.2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    chordView: {
        flex: 1,
    },
    imageStyle: {
        maxWidth: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
})

export const ChordDetailScreen = (props) => {
    const { chord } = props.route.params
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.chordItem}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, }}>{index + 1}.</Text>
                <View style={styles.chordView}>
                    <Image source={item} style={styles.imageStyle} resizeMode="contain" />
                </View>
            </View>
        )
    };

    return (<SafeAreaView style={{ flex: 1, }} edges={['right', 'bottom', 'left']}>
        <View style={styles.container}>
            <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, paddingHorizontal: 10 }}>{chord.label}</Text>
            </View>
            <FlatList
                renderItem={renderItem}
                data={chord.images}
                keyExtractor={(item, index) => String(index)}
            />
        </View>
    </SafeAreaView>
    );
}