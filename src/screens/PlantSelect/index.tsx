import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EnvironmentButton } from '../../components/EnvironmentButton'
import { Header } from '../../components/Header'
import { Load } from '../../components/Load'
import { PlantCardPrimary } from '../../components/PlantCardPrimary'
import { Plant } from '../../libs/storage'
import { api } from '../../services/api'
import colors from '../../styles/colors'
import { PlantSaveParams } from '../PlantSave'
import { PlantSelectStyles } from './styles'

interface Environment {
    key: string;
    title: string;
}

export function PlantSelect() {
    const navigator = useNavigation();

    const [environments, setEnvironments] = useState<Environment[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
    const [activeEnvironment, setActiveEnvironment] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    async function fetchPlants() {
        const { data } = await api
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data)
            setFilteredPlants(data)
        }

        setIsLoading(false)
        setLoadingMore(false)
    }

    function handleEnvironmentButton(key: string) {
        setActiveEnvironment(key)

        if (key === 'all') return setFilteredPlants(plants)

        const filtered = plants.filter(plant => plant.environments.includes(key))
        setFilteredPlants(filtered)
    }

    function handleFetchMore(distance: number) {
        if (distance < 1) return

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    function handlePlantSelect(plant: Plant) {
        navigator.navigate('PlantSave', { plant } as PlantSaveParams);
    }

    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api
                .get('plants_environments?_sort=title&_order=asc')
            setEnvironments([{
                key: 'all',
                title: 'Todos'
            }, ...data])
        }

        fetchEnvironment()
    }, []);

    useEffect(() => { fetchPlants() }, [])

    if (isLoading) return <Load />

    return (
        <SafeAreaView style={PlantSelectStyles.container}>
            <View style={PlantSelectStyles.header}>
                <Header />

                <Text style={PlantSelectStyles.title}>
                    Em qual ambiente
                </Text>

                <Text style={PlantSelectStyles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    data={environments}
                    keyExtractor={item => String(item.key)}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.title}
                            isActive={item.key === activeEnvironment}
                            onPress={() => handleEnvironmentButton(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={PlantSelectStyles.environmentList}
                />
            </View>

            <View style={PlantSelectStyles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            key={item.id}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                />
            </View>
        </SafeAreaView>
    )
}
