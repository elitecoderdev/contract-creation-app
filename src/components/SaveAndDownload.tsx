import { FC } from 'react'
import { Button } from './ui/Button';
import { Download, SaveIcon } from 'lucide-react';

interface SaveAndDownloadProps {
    printDoc: () => void;
    saveDocument: () => void;
}

// SaveAndDownload component renders two buttons for downloading and saving documents
const SaveAndDownload: FC<SaveAndDownloadProps> = ({
    printDoc,
    saveDocument
}) => {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center gap-10 mt-10">
      <Button
        className="flex items-center gap-3"
        onClick={printDoc}
        variant="outline"
      >
        <Download size={20} />
        Download
      </Button>
      <Button
        className="flex items-center gap-3"
        onClick={saveDocument}
      >
        <SaveIcon size={20} />
        Save
      </Button>
    </div>
  );
}

export default SaveAndDownload