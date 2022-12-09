import React from 'react'
import { TextInput } from 'react-native'

const styles = {
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    }
}
export default function (props) {
    const { style } = props
    return <TextInput
        style={{
            ...styles.input,
            ...style,
        }}
        {...props}
    />
}