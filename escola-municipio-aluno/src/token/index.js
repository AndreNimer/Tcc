import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState(null);
  const [id_responsavel, setId] = useState(null);
  const [id_aluno, setAluno] = useState(null);
  const [id_professor, setProfessor] = useState(null);
  const [id_materia, setMateria] = useState(null);
  const [id_escola, setEscola] = useState(null);
  const [id_atv, setAtv] = useState(null);
  
  return (
    <TokenContext.Provider value={{ token, setToken, id_responsavel, setId, id_aluno, setAluno, id_materia, setMateria, id_professor, setProfessor, id_escola, setEscola, id_atv, setAtv  }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
