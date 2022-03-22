export interface MenuDataTypes {
  id: string;
  value: string;
}

export interface MenuGrpTypes {
  id: number;
  menuname: string;
}
export interface ErrorMsgPropTypes {
  menugroup1: string;
  menugroup2: string;
  menugroup3: string;
}

export interface IFormInputs {
  [key: string]: string;
}

export interface RuleTypes {
  [key: string]: number[];
}
