import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'

import LoadAnimation from '../../assets/load.json'
import { LoadStyles } from './styles'

export function Load() {
    return (
        <View style={LoadStyles.load}>
            <LottieView
                source={LoadAnimation}
                autoPlay
                loop
                style={LoadStyles.animation}
            />
        </View>
    )
}
