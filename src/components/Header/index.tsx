import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { HeaderStyles } from './styles'

import UserImage from '../../assets/renato.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../styles/colors';

export function Header() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        async function fetchUserName() {
            const name = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(name || '');
        }
        fetchUserName();
    }, [userName])

    return (
        <View>
            <View style={HeaderStyles.container}>
                <View>
                    <Text style={HeaderStyles.greetings}>Olá,</Text>
                    <Text style={HeaderStyles.userName}>{userName}</Text>
                </View>

                <Image source={UserImage} style={HeaderStyles.image} />


            </View>
        </View>
    )
}
