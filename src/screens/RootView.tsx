import React, { useEffect, useState } from 'react';
import RNIap, { ProductPurchase, PurchaseError, purchaseErrorListener, purchaseUpdatedListener } from 'react-native-iap';
import { purchasedAdSub } from '../services/appservice';

var purchaseUpdateSubscription: any = null;
var purchaseErrorSubscription: any = null;
export const RootView = (props) => {

  useEffect(() => {

    // in app purchase
    RNIap.initConnection().then(() => {
      purchaseUpdateSubscription = purchaseUpdatedListener((purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
        const { transactionReceipt, ...rest } = purchase

        if (transactionReceipt) {
          RNIap.finishTransaction(purchase).then(() => {
            console.info('Purchased successfully ===>', purchase)
            purchasedAdSub.next(purchase)
          });
        }
      });

      purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
        console.error('purchase error=>', error)
      });
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

  }, []);
  return <React.Fragment>
    {props.children}
  </React.Fragment>
}