import React, { useEffect } from 'react'
import { Platform, View } from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { ADMOB_APP_UNIT_ID } from '../../assets/constants';

const AD_INTERVAL = 60 * 2 * 1000
export const CustomAdMobBanner = (props) => {


    useEffect(() => {
        showAds()

        AdMobInterstitial.addEventListener('interstitialDidClose', () => {
            setTimeout(() => {
                showAds()
            }, AD_INTERVAL);
        })
        return () => {
            AdMobInterstitial.removeAllListeners()
        }
    }, [])


    const showAds = async () => {
        let unitId = ADMOB_APP_UNIT_ID.IOS

        if (Platform.OS === 'android') {
            unitId = ADMOB_APP_UNIT_ID.ANDROID
        }
        await AdMobInterstitial.setAdUnitID(unitId); // Test ID, Replace with your-admob-unit-id
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
    }
    return <View>

    </View>
}
