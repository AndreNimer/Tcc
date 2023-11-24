import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home, Chat, Boletim, Atividades, Comunicado } from '../pages';
import { Entypo, Feather, AntDesign }from '@expo/vector-icons';
import Btn_Chat from '../Componentes/Btn_Chat';
const Tab = createBottomTabNavigator();


export default function RoutesTabs() {
  return (
    <Tab.Navigator 
        screenOptions={{
            headerShown: true,
            tabBarStyle: {
                backgroundColor:'#121212',
                borderTopColor:'transparent',
                paddingBottom:10,
                paddingTop:10,
                height:'10%',
                
            },
            headerStyle: {
              backgroundColor: '#3086ff',
              height: 80,
              
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            
            tabBarActiveTintColor:'#3086ff',
            tabBarInactiveTintColor:'#ffffff',
            
        }}
    >

        <Tab.Screen 

            name='Home' 
            component={Home}
            options={{
                tabBarIcon:({size,color}) => (
                   <Entypo name='home' size={size} color={color}/>
                )
            }}
            
        />
          <Tab.Screen 

            name='Boletim' 
            component={Boletim}
            options={{
                tabBarIcon:({size,color}) => (
                   <Feather name='file-text' size={size} color={color}/>
                )
            }}
        />
        <Tab.Screen 

            name='Chat' 
            component={Chat}
            options={{
                tabBarLabel:'',
                tabBarIcon:({ focused, size }) => (
                    <Btn_Chat size={size} focused={focused}/>
                )
            }}
        />
      
        <Tab.Screen 

            name='Atividades' 
            component={Atividades}
            options={{
                tabBarIcon:({size,color}) => (
                   <Feather name='check-square' size={size} color={color}/>
                )
            }}
        />
        <Tab.Screen 

            name='Comunicado' 
            component={Comunicado}
            options={{
                tabBarIcon:({size,color}) => (
                   <AntDesign name='notification' size={size} color={color}/>
                )
            }}
        />

    </Tab.Navigator>
  )
}