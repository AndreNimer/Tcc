import { View, StyleSheet, Text, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import api from '../../Api';
import { useToken } from '../../token';

const Progress = ({ step, steps, height }) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const colorAnimation = useRef(new Animated.Value(0)).current;

 useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(colorAnimation, {
      toValue: step / steps,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [step, steps, colorAnimation, reactive, animatedValue]);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step,steps, width, reactive]);

  let inputRange, outputRange;

  if (steps === '100') {
    inputRange = [0, 1];
    outputRange = ['#d80303', '#3086ff'];
  } else {
    inputRange = [0, 1];
    outputRange = ['#3086ff', '#d80303'];
  }

  const backgroundColor = colorAnimation.interpolate({
    inputRange,
    outputRange,
  });
  return (
    <>
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{
          height,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: height,
          overflow: 'hidden',
          justifyContent:'center',
          marginBottom:10,
        }}
      >
        <Animated.View
          style={{
            height,
            backgroundColor,
            borderRadius: height,
            width: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        />
        <Text style={{ fontSize: 14, fontWeight: '900', paddingRight: 20, alignSelf:'flex-end', zIndex:1, }}>
          {step}/{steps}
        </Text>
      </View>
    </>
  );
}


export default function Notas_Faltas() {
  
  const [bimestres, setbimestre] = useState([]);
  const [faltas, setfaltas] = useState([]);
  const { token, id_materia } = useToken();
  const getbimestre = async () => {
    try {
      const response = await api.get(`/${id_materia}/boletin`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        
        const bimestreData = response.data
        console.log(bimestreData.bimestresSoma)
        setbimestre(bimestreData.bimestresSoma)
        setfaltas(bimestreData.faltas)
      }
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };
  useEffect(() => {
    getbimestre();
  }, []);
  return (
    <View style={styles.conteiner}>
      <Text style={styles.title}>Notas e Faltas</Text>
      {bimestres.map((bimestre, index) => (
        <React.Fragment key={index}>
          <Text style={styles.texto}>{`${index + 1}º Bimestre:`}</Text>
          <Progress step={bimestre} steps='100' height={25} />
        </React.Fragment>
      ))}
      {faltas.map((falta, index) => (
        <React.Fragment key={index}>
        <Text style={styles.texto}>Faltas:</Text>
          <Progress step={falta} steps='40' height={25} />
        </React.Fragment>
      ))}
    </View>

  );
}

const styles = StyleSheet.create({
  conteiner:{
    paddingStart:20,
    paddingEnd: 20,
    paddingTop:10,
    borderRadius: 20,
    shadowColor: '#d3d3d3',
    shadowOffset:{
      width: 2,
      height: 2,
    },
  },
  texto: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  title:{
    fontSize: 20,
    fontWeight:'bold',
    letterSpacing: 2,
    textAlign:'center',
  }
});