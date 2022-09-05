/* eslint-disable camelcase */
export interface IUser {
   nome: string;
   email: string;
   matricula: number;
   id: string;
   token: string;
}

export interface IMaterial {
   id: string;
   codigo: string;
   descricao: string;
   classificacao: string;
   valor: string;
   ged: string;
   ft: string;
   item: string;
}

export interface IReqEpi {
   id?: string;
   whoFor: string;
   data: string;
   description: string;
   quantidade: string;
   situacao: string;
   image: string;
   material_info: IMaterial;
   user_info: IUser;
}

export interface IReqFerramenta {
   id?: string;
   whoFor: string;
   data: string;
   description: string;
   quantidade: string;
   situacao: string;
   image: string;
   placa: string;
   veiculo: string;
   material_info: IMaterial;
   user_info: IUser;
}
