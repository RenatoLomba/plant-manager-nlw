import React from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    View
} from 'react-native'
import { WelcomeStyles } from './styles'
import { Feather } from '@expo/vector-icons'

import WateringImage from '../../assets/watering.png';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Welcome() {
    const navigator = useNavigation();

    async function handleStart() {
        const name = await AsyncStorage.getItem('@plantmanager:user')
        if (!name) return navigator.navigate('UserIdentification')
        navigator.navigate('PlantSelect')
    }

    return (
        <SafeAreaView style={WelcomeStyles.container}>
            <View style={WelcomeStyles.wrapper}>
                <Text style={WelcomeStyles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                </Text>
                <Image
                    source={WateringImage}
                    style={WelcomeStyles.image}
                    resizeMode="contain"
                />
                <Text style={WelcomeStyles.subtitle}>
                    Não esqueça mais de regar suas
                    plantas. Nós cuidamos de lembrar você
                    sempre que precidar.
                </Text>
                <TouchableOpacity
                    style={WelcomeStyles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather
                        name="chevron-right"
                        style={WelcomeStyles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
