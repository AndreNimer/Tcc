export class User {
    id?: string;
    nome: string;
    email: string;
    cpf: string;
    senha: string;

}

export class UserAluno {

    id?: string;
    nome: string;
    cpf: string;
    escola_id: string;
    responsavel_id: string;
    
}

export class UserProfessor {

    id?: string;
    nome: string;
    cpf: string;
    escola_id: string;
    
}
