import { useNavigation, useRoute } from '@react-navigation/core'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Button } from '../../components/Button'
import { ConfirmationStyles } from './styles'

export interface ConfirmationParams {
    title: string;
    subtitle: string;
    buttonTitle: string;
    iconName: 'smile' | 'hug',
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😁'
}

export function Confirmation() {
    const navigator = useNavigation()
    const route = useRoute()

    const {
        buttonTitle,
        iconName,
        nextScreen,
        subtitle,
        title
    } = route.params as ConfirmationParams

    const handleMoveOn = () => navigator.navigate(nextScreen)

    return (
        <SafeAreaView style={ConfirmationStyles.container}>
            <View style={ConfirmationStyles.content}>
                <Text style={ConfirmationStyles.emoji}>
                    {emojis[iconName]}
                </Text>

                <Text style={ConfirmationStyles.title}>{title}</Text>

                <Text style={ConfirmationStyles.subtitle}>
                    {subtitle}
                </Text>

                <View style={ConfirmationStyles.footer}>
                    <Button
                        title={buttonTitle}
                        disabled={false}
                        onPress={handleMoveOn}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
