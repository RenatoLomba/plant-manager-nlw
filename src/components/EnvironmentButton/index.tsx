import React from 'react'
import { Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { EnvironmentButtonStyles } from './styles'

interface EnvironmentButtonProps extends RectButtonProps {
    title: string;
    isActive?: boolean;
}

export function EnvironmentButton({
    title,
    isActive = false,
    ...rest
}: EnvironmentButtonProps) {
    return (
        <RectButton
            style={[
                EnvironmentButtonStyles.button,
                isActive && EnvironmentButtonStyles.buttonActive
            ]}
            {...rest}
        >
            <Text
                style={[
                    EnvironmentButtonStyles.text,
                    isActive && EnvironmentButtonStyles.textActive
                ]}
            >{title}</Text>
        </RectButton>
    )
}
