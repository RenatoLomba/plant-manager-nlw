import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native'
import { Button } from '../../components/Button'
import colors from '../../styles/colors';
import { UserIdentificationStyles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ConfirmationParams } from '../Confirmation';

export function UserIdentification() {
    const navigator = useNavigation()
    const [isActive, setIsActive] = useState(false);
    const [userName, setUserName] = useState('');

    const handleInputBlur = () => userName.length === 0 && setIsActive(false)

    const handleInputFocus = () => setIsActive(true)

    const handleInputChange = (value: string) => setUserName(value)

    async function handleConfirmation() {
        try {
            await AsyncStorage.setItem('@plantmanager:user', userName)
            navigator.navigate('Confirmation', {
                buttonTitle: 'Começar',
                iconName: 'smile',
                nextScreen: 'PlantSelect',
                subtitle: 'Agora podemos começar a cuidar de suas plantinhas ' +
                    'com muito cuidado!',
                title: 'Prontinho'
            } as ConfirmationParams)
        } catch (error) {
            return Alert.alert('Não foi possível salvar o seu nome 😢, tente novamente!')
        }
    }

    return (
        <SafeAreaView style={UserIdentificationStyles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={UserIdentificationStyles.content}>
                    <View style={UserIdentificationStyles.form}>
                        <Text style={UserIdentificationStyles.emoji}>
                            {userName.length > 0 ? '😁' : '🙂'}
                        </Text>
                        <Text style={UserIdentificationStyles.heading}>
                            Como podemos {'\n'}
                        chamar você?
                    </Text>
                        <TextInput
                            style={[
                                UserIdentificationStyles.input,
                                isActive && { borderBottomColor: colors.green }
                            ]}
                            placeholder="Digite um nome"
                            value={userName}
                            onChangeText={handleInputChange}
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                        />

                        <View style={UserIdentificationStyles.footer}>
                            <Button
                                title="Confirmar"
                                disabled={!userName.length}
                                onPress={handleConfirmation}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
