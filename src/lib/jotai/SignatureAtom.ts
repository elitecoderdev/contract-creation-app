import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type Signature = {
  id: string;
  documentName: string;
  content: string;
  signatures: {
    name: string;
    sign: string;
  }[];
};

type Contracts = {
  email : string;
  contracts : Signature[]
}

interface DocumentData {
  id: string;
  documentName: string;
  content: string;
  signatures: {
    name: string;
    sign: string;
  }[];
}

export const signaturesAtom = atomWithStorage<Contracts[]>(
  'ContractData',
  []
);

export const documentDataAtom = atom<DocumentData>(
  {} as DocumentData
);


export const showSignaturePadAtom = atom(false)