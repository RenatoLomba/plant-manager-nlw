import React, { useEffect, useState } from 'react'
import {
    Image,
    Text,
    View,
    FlatList,
    Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/Header'
import { MyPlantsStyles } from './styles'

import WaterdropImage from '../../assets/waterdrop.png'
import { getPlants, Plant, removePlant } from '../../libs/storage'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Load } from '../../components/Load'
import { PlantCardSecondary } from '../../components/PlantCardSecondary'

export function MyPlants() {
    const [plants, setPlants] = useState<Plant[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWatered, setNextWatered] = useState('Sem plantas para regar')

    useEffect(() => {
        async function loadStoragedPlants() {
            const plantsStoraged = await getPlants()

            if (plantsStoraged.length > 0) {
                const nextTime = formatDistance(
                    new Date(plantsStoraged[0].dateTimeNotification || new Date()).getTime(),
                    new Date().getTime(),
                    { locale: ptBR }
                )

                setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`)
                setPlants(plantsStoraged)
            }
            setLoading(false)
        }

        loadStoragedPlants()
    }, [])

    function handleRemove(plant: Plant) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                style: 'default',
                onPress: async () => {
                    try {
                        await removePlant(String(plant.id))
                        setPlants(oldData => (
                            oldData.filter((item) => item.id !== plant.id)
                        ))
                        plants.length === 0 && setNextWatered('Sem plantas para regar')
                    } catch (error) {
                        Alert.alert(`Ops, não foi possível remover a ${plant.name}, tente novamente...`)
                    }
                }
            }
        ])
    }

    if (loading) return <Load />

    return (
        <SafeAreaView style={MyPlantsStyles.container}>
            <Header />

            <View style={MyPlantsStyles.spotlight}>
                <Image
                    source={WaterdropImage}
                    style={MyPlantsStyles.spotlightImage}
                />
                <Text style={MyPlantsStyles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={MyPlantsStyles.plants}>
                <Text style={MyPlantsStyles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList
                    data={plants}
                    keyExtractor={plant => String(plant.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                            data={{ ...item, hour: item.hourFormatted || '00:00' }}
                            handleRemove={() => handleRemove(item)}
                        />
                    )}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}
