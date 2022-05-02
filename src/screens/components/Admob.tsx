import React from 'react'
import { Platform } from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { ADMOB_APP_UNIT_ID } from '../../assets/constants';

export const CustomAdMobBanner = (props) => {
    const bannerError = (err) => {
        console.info(err)
    }
    if (Platform.OS === 'ios') {

        return <AdMobBanner
            bannerSize="fullBanner"
            adUnitID={ADMOB_APP_UNIT_ID.IOS} // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={bannerError} />
    }

    if (Platform.OS === 'android') {

        return <AdMobBanner
            bannerSize="fullBanner"
            adUnitID={ADMOB_APP_UNIT_ID.ANDROID} // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={bannerError} />
    }

}
