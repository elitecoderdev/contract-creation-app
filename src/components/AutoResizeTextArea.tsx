import React, { ChangeEvent, FC, useEffect, useRef } from 'react';

interface AutoResizeTextAreaProps {
  documentData: {
    id: string;
    documentName: string;
    content: string;
    signatures: {
        name: string;
        sign: string;
    }[];
  }
  setDocumentData: React.Dispatch<React.SetStateAction<{
    id: string;
    documentName: string;
    content: string;
    signatures: {
        name: string;
        sign: string;
    }[];
  }>>;
}

// AutoResizeTextArea component
const AutoResizeTextArea: FC<AutoResizeTextAreaProps> = ({
  documentData,
  setDocumentData,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDocumentData((prevData) => ({
      ...prevData,
      content: event.target.value,
    }));
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height to auto to adjust to content
      if (textareaRef.current.scrollHeight < 100) {
        textareaRef.current.style.height = `1476px`;
      } else {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
    setDocumentData((prevData) => ({
      ...prevData,
      content: documentData.content,
    }));
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue- resize-none"
      value={documentData.content}
      onChange={handleTextareaChange}
      rows={1} // Set an initial number of rows
    />
  );
};

export default AutoResizeTextArea;
