import React from 'react'
import { Animated, Text, View } from 'react-native'
import { PlantCardSecondaryStyles } from './styles'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SvgFromUri } from 'react-native-svg'
import { Feather } from '@expo/vector-icons'
import colors from '../../styles/colors'

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

export function PlantCardSecondary({ data, handleRemove, ...rest }: PlantProps) {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={PlantCardSecondaryStyles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather
                                name="trash" size={32} color={colors.white}
                            />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={PlantCardSecondaryStyles.card}
                {...rest}
            >
                <SvgFromUri
                    uri={data.photo}
                    width={50}
                    height={50}
                />
                <Text style={PlantCardSecondaryStyles.title}>
                    {data.name}
                </Text>
                <View style={PlantCardSecondaryStyles.details}>
                    <Text style={PlantCardSecondaryStyles.timeLabel}>
                        Regar às
                </Text>
                    <Text style={PlantCardSecondaryStyles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}
