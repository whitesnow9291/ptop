import React, { useEffect, useState } from 'react'
import { Platform, View } from 'react-native';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

import { ADMOB_APP_UNIT_ID } from '../../assets/constants';

const AD_INTERVAL = 2 * 1000 * 60
let unitId = ADMOB_APP_UNIT_ID.IOS

if (Platform.OS === 'android') {
    unitId = ADMOB_APP_UNIT_ID.ANDROID
}
const interestialAd = InterstitialAd.createForAdRequest(unitId);

export const CustomAdMobBanner = (props) => {


    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interestialAd.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        // Start loading the interstitial straight away
        interestialAd.load();
        // Unsubscribe from events on unmount
        return () => {
            setLoaded(false)
            unsubscribe()
        };
    }, []);
    useEffect(() => {
        const unsubscribe = interestialAd.addAdEventListener(AdEventType.CLOSED, () => {
            setLoaded(false)
            setTimeout(() => {
                interestialAd.load();
            }, AD_INTERVAL);
        });

        return () => {
            unsubscribe()
        };
    }, []);
    useEffect(() => {
        if (loaded) {
            interestialAd.show()
        }
    }, [loaded])

    return <View>

    </View>
}
