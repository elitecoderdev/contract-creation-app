import { FC, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import {
  showSignaturePadAtom,
  signaturesAtom,
} from '../lib/jotai/SignatureAtom';
import { useReactToPrint } from 'react-to-print';
import AutoResizeTextArea from '../components/AutoResizeTextArea';
import Markdown from 'markdown-to-jsx';
import useFetchContractAgreementText from '../hooks/fetchDataHooks/useFetchContractAgreementText';
import LoadingScreen from '../components/LoadingScreen';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../hooks/AuthProvider';
import ContractSignature from '../components/ContractSignature';
import ContractFileHeader from '../components/ContractFileHeader';
import ContractFileFooter from '../components/ContractFileFooter';
import SaveAndDownload from '../components/SaveAndDownload';

interface NewDocumentProps {}

interface DocumentData {
  id: string;
  documentName: string;
  content: string;
  signatures: {
    name: string;
    sign: string;
  }[];
}

const NewDocument: FC<NewDocumentProps> = ({}) => {
  const { contractText, isLoading } = useFetchContractAgreementText();

  const { user } = useAuth();

  const [documentData, setDocumentData] = useState<DocumentData>({
    id: '',
    documentName: '',
    content: '',
    signatures: [],
  });
  const componentRef = useRef<HTMLDivElement>(null);
  const [editDocName, setEditDocName] = useState<boolean>(false);
  const [showSignaturePad, setShowSignaturePad] = useAtom(
    showSignaturePadAtom
  );
  const [, setSignatureData] = useAtom(signaturesAtom);
  const [edit, setEdit] = useState<boolean>(false);

  const printDoc = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    setDocumentData({
      id: uuidv4(),
      documentName: 'Untitled Document',
      content: contractText,
      signatures: [],
    });
  }, []);

  const saveDocument = () => {
    setSignatureData((prevData) => {
      const userIndex = prevData.findIndex(
        (contract) => contract.email === user?.email
      );

      if (userIndex !== -1) {
        // If the user exists, update the contracts array
        const updatedContracts = [...prevData];
        const userContracts = [...prevData[userIndex].contracts];

        const existingContractIndex = userContracts.findIndex(
          (doc) => doc.id === documentData.id
        );

        if (existingContractIndex !== -1) {
          // If the document exists, update it
          userContracts[existingContractIndex] = documentData;
        } else {
          // If the document doesn't exist, add it to the contracts array
          userContracts.push(documentData);
        }

        updatedContracts[userIndex] = {
          ...prevData[userIndex],
          contracts: userContracts,
        };

        return updatedContracts;
      } else {
        // If the user doesn't exist, create a new entry
        const newUserContract = {
          email: user?.email || '',
          contracts: [documentData],
        };
        return [...prevData, newUserContract];
      }
    });
    window.location.href = '/';
  };

  if (isLoading) return <LoadingScreen />;
  return (
    <div className="md:px-20 md:py-10 p-5">
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

export default NewDocument;
