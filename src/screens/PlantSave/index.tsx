import React, { useState } from 'react'
import {
    Text,
    View,
    ScrollView,
    Image,
    Platform,
    Alert,
    TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlantSaveStyles } from './styles'
import { SvgFromUri } from 'react-native-svg'
import WaterDropImage from '../../assets/waterdrop.png'
import { Button } from '../../components/Button'
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { Plant, storePlant } from '../../libs/storage'
import { ConfirmationParams } from '../Confirmation'

export interface PlantSaveParams {
    plant: Plant;
}

export function PlantSave() {
    const navigator = useNavigation()
    const route = useRoute();
    const { plant } = route.params as PlantSaveParams

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

    function handleChangeTime(event: Event, datetime: Date | undefined) {
        if (Platform.OS === 'android') setShowDatePicker(oldState => !oldState)

        if (datetime && isBefore(datetime, new Date())) {
            setSelectedDateTime(new Date())
            return Alert.alert('Escolha uma hora no futuro! ⌚')
        }

        if (datetime) setSelectedDateTime(datetime)
    }

    const handleOpenDatePickerForAndroid = () => setShowDatePicker(oldState => !oldState)

    async function handleSavePlant() {
        try {
            await storePlant({ ...plant, dateTimeNotification: selectedDateTime })
            navigator.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de ' +
                    'cuidar da usa plantinha com bastante amor',
                buttonTitle: 'Muito obrigado :D',
                iconName: 'hug',
                nextScreen: 'MyPlants'
            } as ConfirmationParams)
        } catch (error) {
            return Alert
                .alert('Ops, não foi possível salvar a sua planta 😢... ' +
                    'Tente novamente!')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={PlantSaveStyles.container}
            >
                <View style={PlantSaveStyles.container}>
                    <View style={PlantSaveStyles.plantInfo}>
                        <SvgFromUri
                            uri={plant.photo}
                            height={150}
                            width={150}
                        />

                        <Text style={PlantSaveStyles.plantName}>
                            {plant.name}
                        </Text>
                        <Text style={PlantSaveStyles.plantAbout}>
                            {plant.about}
                        </Text>
                    </View>

                    <View style={PlantSaveStyles.controller}>
                        <View style={PlantSaveStyles.tipContainer}>
                            <Image
                                source={WaterDropImage}
                                style={PlantSaveStyles.tipImage}
                            />
                            <Text style={PlantSaveStyles.tipText}>
                                {plant.water_tips}
                            </Text>
                        </View>
                        <Text style={PlantSaveStyles.alertLabel}>
                            Escolha o melhor horário para ser lembrado
                </Text>

                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDateTime}
                                mode="time"
                                display="spinner"
                                onChange={handleChangeTime}
                            />
                        )}

                        {
                            Platform.OS === 'android' && (
                                <TouchableOpacity
                                    style={PlantSaveStyles.datePickerButton}
                                    onPress={handleOpenDatePickerForAndroid}
                                >
                                    <Text style={PlantSaveStyles.datePickerText}>
                                        {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }

                        <Button
                            title="Cadastrar planta"
                            onPress={handleSavePlant}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
