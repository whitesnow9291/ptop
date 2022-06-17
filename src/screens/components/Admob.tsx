import React, { useEffect, useState } from 'react'
import { Platform, View } from 'react-native';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, AdEventType, RewardedAdEventType } from 'react-native-google-mobile-ads';

import { ADMOB_APP_UNIT_ID, IOS_ADMOB_UNIT_PROD_ID, IOS_REWARD_PROD_ID, IS_PRODUCTION } from '../../assets/constants';

const AD_INTERVAL = 2 * 1000 * 60

let rewardUnitId = (IS_PRODUCTION) ? IOS_REWARD_PROD_ID : TestIds.REWARDED

if (Platform.OS === 'android') {
    rewardUnitId = ADMOB_APP_UNIT_ID.ANDROID
}

const rewardedAd = RewardedAd.createForAdRequest(rewardUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});
export const CustomAdMobBanner = (props) => {


    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });

        const unsubscribeEarned = rewardedAd.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
            },
        );

        const unsubscribeError = rewardedAd.addAdEventListener(
            AdEventType.ERROR,
            error => {
                console.info('=== ad error ===', JSON.stringify(error, null, 4))
            },
        );
        // Start loading the rewarded ad straight away
        // Unsubscribe from events on unmount
        rewardedAd.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
            unsubscribeError();
        };
    }, []);


    useEffect(() => {

        const timerId = setInterval(function () {
            setLoaded(false)
            rewardedAd.load();
        }, AD_INTERVAL)

        if (loaded) {
            rewardedAd.show()
        }
        return () => {
            clearInterval(timerId)
        }
    }, [loaded])

    return <View>

    </View>
}
