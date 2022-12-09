import { useFocusEffect, useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { ActivityIndicator, Platform, View, StyleSheet, Button } from 'react-native';
import * as RNIap from 'react-native-iap';
import AppText from '@app/screens/components/AppText'
import { Product } from 'react-native-iap';
import { PURCHASE_ADS_ID } from '@app/assets/constants';
import { useDispatch } from 'react-redux';
import { savePurchasedProducts } from '@app/redux/reducers/user';
export const PurchaseAds = (props) => {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)
	const [adsProduct, setAdsProduct] = useState(null)
	const [alreadyPurchased, setAlreadyPurchased] = useState(false)

	useFocusEffect(React.useCallback(() => {
		getPurchaseAdProduct()
	}, []))


	const getPurchaseAdProduct = async () => {

		try {
			setIsLoading(true)
			const itemIds = Platform.select({
				ios: [PURCHASE_ADS_ID],
			});
			const app_products: Product[] = await RNIap.getProducts(itemIds);
			setIsLoading(false)

			if (app_products.length !== 0) {
				if (Platform.OS === 'android') {
					//Your logic here to save the products in states etc
				} else if (Platform.OS === 'ios') {
					// your logic here to save the products in states etc
					setAdsProduct(app_products[0])
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
			const product = await RNIap.requestPurchase(adsProduct.productId, false);

			setIsLoading(false)
		} catch (err) {
			setIsLoading(false)
		}
	}
	const CustomButton = (props) => {
		return <Button {...props} style={styles.custombutton} />
	}

	const onRestorePurchase = async () => {
		const result = await RNIap.getAvailablePurchases()
		dispatch(savePurchasedProducts(result))
		if (result.length > 0) {
			alert('Purchase restored successfully!')
		} else {
			alert('Not found purchases')
		}
	}
	return <View
		style={styles.card}>
		{isLoading && <ActivityIndicator />}
		{alreadyPurchased && <AppText status='success'>Purchased!</AppText>}
		{!alreadyPurchased && adsProduct && <CustomButton
			onPress={onPurchaseProduct}
			title={`Remove Ads - ${adsProduct.localizedPrice}`}
		>
			Remove Ads - {adsProduct.localizedPrice}
		</CustomButton>}
		<CustomButton
			onPress={onRestorePurchase}
			title="Restore"
		/>
	</View>
}


const styles = StyleSheet.create({
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