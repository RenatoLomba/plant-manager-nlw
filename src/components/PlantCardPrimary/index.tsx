import React from 'react'
import { Text, View } from 'react-native'
import { PlantCardPrimaryStyles } from './styles'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    }
}

export function PlantCardPrimary({ data, ...rest }: PlantProps) {
    return (
        <RectButton
            style={PlantCardPrimaryStyles.card}
            {...rest}
        >
            <SvgFromUri
                uri={data.photo}
                width={70}
                height={70}
            />
            <Text style={PlantCardPrimaryStyles.text}>
                {data.name}
            </Text>
        </RectButton>
    )
}
