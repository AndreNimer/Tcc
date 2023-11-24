import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'; 
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../../Api';
import { useToken } from '../../token';

export default function Alunos() {
  const navigation = useNavigation();
  const [alunos, setAlunos] = useState([]);
  const [escolas, setEscolas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const { token, id_responsavel, setAluno, setEscola } = useToken();

  const handleAlunoClick = (alunoId) => {
    setAluno(alunoId);
    navigation.navigate('Tabs');
  };
 useFocusEffect(
    React.useCallback(() => {
      const getAlunos = async () => {
        try {
          const response = await api.get('/alunos', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            const alunosData = response.data;

            const filtroAlunos = alunosData.filter(aluno => aluno.responsavel_id === id_responsavel);
            
            setAlunos(filtroAlunos);
            setEscola(filtroAlunos.map(aluno => aluno.escola_id));
          }
        } catch (error) {
          console.error('Erro ao buscar alunos:', error);
        }
      };

      getAlunos();
    }, [token, id_responsavel])
  );
  useFocusEffect(
    React.useCallback(() => {
      const getEscola = async () => {
            try {
              const response = await api.get('/escolas',{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });

              if (response.status === 200) {
                
                const escolaData = response.data
                setEscolas(escolaData)
              }
            } catch (error) {
              console.error('Erro ao buscar alunos:', error);
            }
      };

      getEscola();
    },[])
  )
  useFocusEffect(
    React.useCallback(() => {
      const getturmas = async () => {
            try {
              const response = await api.get('/turmas',{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });

              if (response.status === 200) {
                
                const turmasData = response.data
                setTurmas(turmasData)
              }
            } catch (error) {
              console.error('Erro ao buscar alunos:', error);
            }
      };

      getturmas();
    },[])
  )
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Animatable.View delay={500} animation="fadeInLeft" style={styles.containerHeader}>
        <Text style={styles.message}>Alunos</Text>
      </Animatable.View>
      <Animatable.View delay={500} animation="fadeInUp" style={styles.containerForm}>
        {alunos.map((aluno) => (
          <TouchableOpacity
            key={aluno.id}
            style={styles.alunosItem}
            onPress={() => handleAlunoClick(aluno.id)}>
            <Text style={styles.alunostext}>{aluno.nome}</Text>
            <Text style={styles.complementos}>
              Escola: {escolas.find((escola) => escola.id === aluno.escola_id)?.nome || 'Escola não encontrada'}
            </Text>
            <Text style={styles.complementos}>
              Turma: {turmas.find((turma) => turma.aluno_id.includes(aluno.id))?.nome || 'Turma não encontrada'}
            </Text>
          </TouchableOpacity>
        ))}


        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('CadastroFilho');
          }}>
          <Text style={styles.btn_text}>Cadastar-Filho</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#3086ff',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '10%',
    paddingEnd: '10%',
    paddingTop:20,
  },
  alunosItem: {
    flexDirection: 'column',
    backgroundColor: '#f0eded',
    marginBottom: 10,
    borderRadius: 30,
    shadowColor: '#d3d3d3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    justifyContent:'center',
    padding: 20,
  },
  alunostext: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 500,
    textAlign: 'center', 
    letterSpacing: 1,
  },
  complementos: {
    color: '#a1a1a1',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'left',
  },
  btn: {
    backgroundColor: '#121212',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});