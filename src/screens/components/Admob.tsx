import React from 'react'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { ADMOB_APP_PUB_KEY } from '../../assets/constants';


export const CustomAdMobBanner = (props) => {
    const bannerError = (err) => {
        console.info(err)
    }
    return <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={'ca-app-pub-3940256099942544/2934735716'} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={bannerError} />
}
export const CustomPublisherBanner = (props) => {
    const adMobEvent = (evt) => {
        console.info(evt)
    }
    return <PublisherBanner
        bannerSize="fullBanner"
        adUnitID={ADMOB_APP_PUB_KEY} // Test ID, Replace with your-admob-unit-id
        onDidFailToReceiveAdWithError={this.bannerError}
        onAdMobDispatchAppEvent={adMobEvent} />
}