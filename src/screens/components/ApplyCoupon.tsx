import { COLORS } from '@app/assets/colors'
import { COUPON_CODE } from '@app/assets/constants'
import { setCouponSuccess } from '@app/redux/reducers/user'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppButton from './AppButton'
import AppText from './AppText'
import TextInput from './TextInput'
import { useNavigation } from '@react-navigation/native';

const styles = {
    box: {
        padding: 20
    }
}
export default function (props) {
    const [couponTxt, setCouponTxt] = useState('')
    const [error, setError] = useState<string | null>(null)
    const navigation = useNavigation()
    
    const dispatch = useDispatch()
    const onApply = () => {
        if (couponTxt == COUPON_CODE) {
            dispatch(setCouponSuccess())
            alert('Success!')
            navigation.goBack()
        } else {
            setError('Invalid Code!')
        }
    }
    return <View style={styles.box}>
        {/* <AppText style={{
            fontSize: 18,
            color: COLORS.green,
            marginBottom: 10
        }}>I have a Coupon!</AppText> */}
        <View style={{
            flexDirection: 'row',
        }}>
            <View
                style={{
                    flex: 1
                }}>
                <TextInput
                    value={couponTxt}
                    onChangeText={setCouponTxt}
                />
            </View>
            <AppButton title='Apply' onPress={() => onApply()} />
        </View>
        {error && <AppText style={{
            color: COLORS.error
        }}>{error}</AppText>}
    </View>
}