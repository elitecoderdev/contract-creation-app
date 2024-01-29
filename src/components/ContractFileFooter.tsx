// This component represents the footer section of the contract file.
// It includes a button to toggle the visibility of the signature pad and displays a message for signing the contract.
// The SignaturesPad component is rendered when the signature pad is visible.

import { FC } from 'react'
import { Button } from './ui/Button';
import SignaturesPad from './SignaturesPad';

interface ContractFileFooterProps {
  setShowSignaturePad : React.Dispatch<React.SetStateAction<boolean>>;
    showSignaturePad : boolean;
    setDocumentData : React.Dispatch<React.SetStateAction<{
        id: string;
        documentName: string;
        content: string;
        signatures: {
            name: string;
            sign: string;
        }[];
    }>>;

}

const ContractFileFooter: FC<ContractFileFooterProps> = ({
    setShowSignaturePad,
    showSignaturePad,
    setDocumentData,
}) => {
  return (
    <div className="border-t mt-10 no-print">
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h5 className="title1-mobile">Signatures</h5>
          <Button
            onClick={() => setShowSignaturePad(!showSignaturePad)}
            size="md"
          >
            {showSignaturePad ? 'Remove Signature' : 'Add Signature'}
          </Button>
        </div>
        {showSignaturePad && (
          <p className="font-semibold text-[1.8rem] text-justify text-gray-500 mt-5">
            Please sign below to indicate your agreement to the terms
            of this contract.
          </p>
        )}
      </div>
      {showSignaturePad && (
        <SignaturesPad setDocumentData={setDocumentData} />
      )}
    </div>
  );
}

export default ContractFileFooter