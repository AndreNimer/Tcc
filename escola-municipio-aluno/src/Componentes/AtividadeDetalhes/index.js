
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AtividadeDetalhes({ atividade }){
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text >{atividade.nome}</Text>
      <View>
          <Text>Descrição: {atividade.descricao}</Text>
      </View>
      <Text style={styles.data}>Data de Entrega: {atividade.dataEntrega}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => {
            navigation.navigate('Atividades', {
              atividadeName: atividade.nome,
            });
          }}
      >
          <Text style={styles.btn_text}>Acessar</Text>
      </TouchableOpacity>

        
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 20,
  },
  btn:{
    marginTop:10,
    backgroundColor: '#3086ff',
    borderRadius: 50,
    width: 200,
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  btn_text:{

    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold'

  },
  data:{
    marginTop: 10,
    color: '#a1a1a1',
  }
});

