import React, { useEffect, useState } from 'react';
import RNIap, { Product, ProductPurchase, PurchaseError, purchaseErrorListener, purchaseUpdatedListener } from 'react-native-iap';
import { purchasedAdSub } from '../services/appservice';
import { useDispatch } from 'react-redux'
import { addPurchasedProducts } from '@app/redux/reducers/user';
import { Platform } from 'react-native';

var purchaseUpdateSubscription: any = null;
var purchaseErrorSubscription: any = null;
export const RootView = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (Platform.OS == 'ios' || Platform.OS == 'android') {
      // in app purchase
      RNIap.initConnection().then(() => {

        purchaseUpdateSubscription = purchaseUpdatedListener((purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
          const { transactionReceipt, ...rest } = purchase

          if (transactionReceipt) {
            RNIap.finishTransaction(purchase).then(() => {
              console.info('Purchased successfully ===>', purchase.productId)
              dispatch(addPurchasedProducts(purchase))
            });
          }
        });

        purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
          console.error('purchase error=>', error)
        });
      }).catch((e) => {
        console.info('=== error in app purchase init connection ===', JSON.stringify(e, null, 4))
      })

      return (() => {
        if (purchaseUpdateSubscription) {
          purchaseUpdateSubscription.remove();
          purchaseUpdateSubscription = null;
        }
        if (purchaseErrorSubscription) {
          purchaseErrorSubscription.remove();
          purchaseErrorSubscription = null;
        }
      });
    }

  }, []);
  return <React.Fragment>
    {props.children}
  </React.Fragment>
}