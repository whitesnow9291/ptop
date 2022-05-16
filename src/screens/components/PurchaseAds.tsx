import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
	Button, Card, StyleService, Text, useStyleSheet, useTheme
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import * as RNIap from 'react-native-iap';

const PURCHASE_ADS_ID = "AAAA"
export const PurchasePrintFeature = (props) => {
	const navigation = useNavigation()

	const styles = useStyleSheet(themedStyles);

	const [isLoading, setIsLoading] = useState(false)
	const [printProduct, setAdsProduct] = useState(null)
	const [alreadyPurchased, setAlreadyPurchased] = useState(false)

	useFocusEffect(React.useCallback(() => {
		getPurchaseAdProduct()
	}, []))


	const getPurchaseAdProduct = async () => {

	    try {
	      setIsLoading(true)
	      const itemSubs = Platform.select({
	        ios: [PURCHASE_ADS_ID],
	      });
	      const Products = await RNIap.getSubscriptions(itemSubs);
	      setIsLoading(false)

	      if (Products.length !== 0) {
	        if (Platform.OS === 'android') {
	          //Your logic here to save the products in states etc
	        } else if (Platform.OS === 'ios') {
	          // your logic here to save the products in states etc
	          console.info('ads product ====> ', Products[0])
	          setAdsProduct(Products[0])
	          // Make sure to check the response differently for android and ios as it is different for both
	        }
	      }
	    } catch (err) {
	      setIsLoading(false)
	    }
	};

	const onPurchaseProduct = async () => {
	    try {
	      setIsLoading(true)
	      const itemSubs = Platform.select({
	        ios: [PURCHASE_ADS_ID],
	      });
	      const Products = await RNIap.getProducts(itemSubs);

	      if (Products.length !== 0) {
	        if (Platform.OS === 'android') {
	          //Your logic here to save the products in states etc
	        } else if (Platform.OS === 'ios') {
	          // your logic here to save the products in states etc
	          const product = await RNIap.requestPurchase(Products[0].productId, false);

	          // Make sure to check the response differently for android and ios as it is different for both
	        }

	      }
	      setIsLoading(false)
	    } catch (err) {
	      setIsLoading(false)
	    }
	}
	const CustomButton = (props) => {
		return <Button {...props} style={styles.custombutton} />
	}


	return <Card status='info'
          style={styles.card}
          header={(props) => <View {...props}><Text category='h6' status='primary'>Print Feature</Text></View>}>
      		{isLoading && <ActivityIndicator />}
      		{alreadyPurchased && <Text status='success'>Purchased!</Text>}
          	{!alreadyPurchased && printProduct && <CustomButton 
          		status='info'
          		onPress={onPurchaseProduct}
          		>
          		Purchase Print Feature - {printProduct.localizedPrice}
          	</CustomButton>}
        </Card>
}


const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  layout: {
    padding: 15,
    marginTop: 15,
  },
  card: {
    marginVertical: 15
  },
  custombutton: {
    marginVertical: 4
  }
});