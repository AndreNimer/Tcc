import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Login, Cadastro, BemVindo, Alunos, CadastroFilho} from "../pages";
import { Chat_txt, DescricaoATV } from "../Componentes"
import Tabs from './RoutesTabs'



const Stack = createNativeStackNavigator();


export default function Routes() {
    return (
        
        <Stack.Navigator  
          screenOptions={{

              headerStyle: {
                backgroundColor: '#3086ff',
                height: 80,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              
          }}
        >

            <Stack.Screen name ="BemVindo" component={BemVindo} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
            <Stack.Screen name="Alunos" component={Alunos} options={{ headerShown: false }} />
            <Stack.Screen name="CadastroFilho" component={CadastroFilho} options={{ headerShown: false }} />
            <Stack.Screen
              name="DescricaoATV"
              component={DescricaoATV}
              options={({ route, navigation }) => {
                if (route && route.params) {
                  return {
                    headerTitle: route.params.atividadeName,
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => navigation.goBack()} 
                        style={{ marginRight: 10, marginLeft: 5,  }}
                      >
                        <AntDesign name="left" size={24} color="white" />
                      </TouchableOpacity>
                    ),
                  };
                }
              }}
            />
            <Stack.Screen
              name="Chat_txt"
              component={Chat_txt}
              options={({ route, navigation }) => {
                if (route && route.params) {
                  return {
                    headerTitle: route.params.contatoName,
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => navigation.goBack()} 
                        style={{ marginRight: 10, marginLeft: 5,  }}
                      >
                        <AntDesign name="left" size={24} color="white" />
                      </TouchableOpacity>
                    ),
                    headerRight: () => (
                      <Image
                        source={route.params.contactAvatar}
                        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                      />
                    ),
                  };
                }
              }}
            />
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}