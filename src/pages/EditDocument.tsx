// This is the EditDocument component that allows users to edit and save documents.
// It renders the ContractFileHeader, AutoResizeTextArea or Markdown content, ContractSignature, ContractFileFooter, and SaveAndDownload components.
// The component uses various state variables and hooks such as useState, useEffect, useRef, and useParams.
// It also utilizes the useAtom hook from the jotai library to manage signature data.
// The useReactToPrint hook is used to enable printing functionality.
// The component fetches and updates document data based on the user's email and document ID.
// The saveDocument function updates the signature data and redirects the user to the homepage.

import AutoResizeTextArea from '../components/AutoResizeTextArea';
import { signaturesAtom } from '../lib/jotai/SignatureAtom';
import { useAtom } from 'jotai';
import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Markdown from 'markdown-to-jsx';
import { useAuth } from '../hooks/AuthProvider';
import ContractSignature from '../components/ContractSignature';
import ContractFileHeader from '../components/ContractFileHeader';
import ContractFileFooter from '../components/ContractFileFooter';
import SaveAndDownload from '../components/SaveAndDownload';

interface EditDocumentProps {}

interface DocumentData {
  id: string;
  documentName: string;
  content: string;
  signatures: {
    name: string;
    sign: string;
  }[];
}

const EditDocument: FC<EditDocumentProps> = ({}) => {
  const params = useParams();
  const { user } = useAuth();
  const [signatureData, setSignatureData] = useAtom(signaturesAtom);
  const [edit, setEdit] = useState<boolean>(false);
  const [editDocName, setEditDocName] = useState<boolean>(false);
  const [showSignaturePad, setShowSignaturePad] =
    useState<boolean>(false);
  const [documentData, setDocumentData] = useState<DocumentData>({
    id: '',
    documentName: '',
    content: '',
    signatures: [],
  });
  const componentRef = useRef<HTMLDivElement>(null);

  const printDoc = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (signatureData.length > 0 && user) {
      const emailVerifiedData = signatureData.find(
        (document) => document.email === user.email
      );
      if (emailVerifiedData) {
        if (emailVerifiedData.contracts.length > 0) {
          const data = emailVerifiedData.contracts.find(
            (document) => document.id === params.id
          );
          if (data) {
            setDocumentData(data);
          } else {
            throw new Error('Document not found');
          }
        }
      }
    }
  }, [params.id, user, signatureData]);

  const saveDocument = () => {
    setSignatureData((prevData) => {
      const updatedContracts = prevData.map((contract) => {
        if (contract.email === user?.email) {
          return {
            ...contract,
            contracts: contract.contracts.map((document) =>
              document.id === params.id ? documentData : document
            ),
          };
        }
        return contract;
      });

      return updatedContracts;
    });
    window.location.href = '/';
  };

  return (
    <div className="md:px-20 md:py-10 px-5 py-5">
      <ContractFileHeader
        editDocName={editDocName}
        setEditDocName={setEditDocName}
        edit={edit}
        setEdit={setEdit}
        documentData={documentData}
        setDocumentData={setDocumentData}
      />
      <div
        className="border-2 md:p-20 p-5 rounded-2xl max-w-7xl mx-auto"
        ref={componentRef}
      >
        {edit ? (
          <div className="max-w-7xl mx-auto">
            <AutoResizeTextArea
              documentData={documentData}
              setDocumentData={setDocumentData}
            />
          </div>
        ) : (
          <Markdown>{documentData.content}</Markdown>
        )}
        <ContractSignature signatures={documentData.signatures} />
        <ContractFileFooter
          setShowSignaturePad={setShowSignaturePad}
          showSignaturePad={showSignaturePad}
          setDocumentData={setDocumentData}
        />
      </div>
      <SaveAndDownload
        printDoc={printDoc}
        saveDocument={saveDocument}
      />
    </div>
  );
};

export default EditDocument;
