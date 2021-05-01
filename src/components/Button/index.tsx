import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ButtonStyles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, disabled, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[
                ButtonStyles.container,
                disabled && { opacity: 0.5 }
            ]}
            disabled={disabled}
            {...rest}
        >
            <Text style={ButtonStyles.text}>
                {title}
            </Text>
        </TouchableOpacity >
    )
}
