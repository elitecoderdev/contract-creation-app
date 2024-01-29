import { FC } from 'react'
import { Input } from './ui/Input';
import { Check, Edit, File, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

interface ContractFileHeaderProps {
  editDocName : boolean;
setEditDocName : React.Dispatch<React.SetStateAction<boolean>>;
    edit : boolean;
setEdit : React.Dispatch<React.SetStateAction<boolean>>;
    documentData : {
        id: string;
        documentName: string;
        content: string;
        signatures: {
            name: string;
            sign: string;
        }[];
    };
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

const ContractFileHeader: FC<ContractFileHeaderProps> = ({
    editDocName,
    setEditDocName,
    edit,
    setEdit,
    documentData,
    setDocumentData,
}) => {
  return (
    <div className="md:max-w-7xl max-w-full mx-auto py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {editDocName ? (
          <Input
            icon={<File size={20} className="stroke-cmhq-gray" />}
            value={documentData.documentName}
            onChange={(e) =>
              setDocumentData({
                ...documentData,
                documentName: e.target.value,
              })
            }
          />
        ) : (
          <h5 className="title1-mobile">
            {documentData.documentName}
          </h5>
        )}
        <Button
          variant="outline"
          size="md"
          onClick={() => setEditDocName(!editDocName)}
        >
          {editDocName ? <Check size={20} /> : <Edit size={20} />}
        </Button>
      </div>
      <Button
        onClick={() => setEdit(!edit)}
        size="md"
        className="flex items-center gap-3"
      >
        {edit ? <Sparkles size={20} /> : <Edit size={20} />}
        {edit ? 'Preview' : 'Edit'}
      </Button>
    </div>
  );
}

export default ContractFileHeader