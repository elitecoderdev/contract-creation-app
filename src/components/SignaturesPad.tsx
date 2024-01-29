// This component represents a signature pad where users can draw and save their signatures.
// It includes functionality for saving, undoing, redoing, and clearing signatures.
// The component uses the SignaturePad library for drawing signatures on a canvas.
// The signature data is stored in the parent component's state using the setDocumentData function.
// The component also uses the showSignaturePadAtom from the SignatureAtom file to control its visibility.

import { Eraser, Redo, Save, Undo, User2 } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react'
import SignaturePad from 'signature_pad';
import _ from 'lodash';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useAtom } from 'jotai';
import { showSignaturePadAtom } from '../lib/jotai/SignatureAtom';

interface SignaturePadProps {
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

const SignaturesPad: FC<SignaturePadProps> = ({setDocumentData}) => {
   const signaturePadRef = useRef<SignaturePad | null>(null);
   const [partyName, setPartyName] = useState<string>('');
   const [penColor, setPenColor] = useState<string>('#000000');
   const [,setShowSignaturePad] = useAtom(
     showSignaturePadAtom
   );
   const signatureRedoArray = useRef<string[]>([]);

   const readyPad = () => {
     const wrapper = document.getElementById('signature-pad');
     const canvas = wrapper?.querySelector(
       'canvas'
     ) as HTMLCanvasElement;

     if (canvas) {
       const tempSignaturePad = new SignaturePad(canvas, {
         backgroundColor: 'rgb(255, 255, 255)',
        penColor: penColor,
       });
       signaturePadRef.current = tempSignaturePad;
     }
   };

   const handleSave = () => {
     if (signaturePadRef.current) {
      setDocumentData((prevData) => ({
        ...prevData,
        signatures: [
          ...prevData.signatures,
          {
            name: partyName,
            sign: signaturePadRef.current!.toDataURL(),
          },
        ],
      }));
        setPartyName('');
        signatureRedoArray.current = [];
        signaturePadRef.current.clear();
        handleClear();
        setShowSignaturePad(false);
     }
   };

   const handleUndo = () => {
     if (signaturePadRef.current) {
       const signatureData = signaturePadRef.current.toData();
       const signatureRedoData = _.cloneDeep(signatureData);

       if (signatureData.length > 0) {
         signatureData.pop();
         signaturePadRef.current.fromData(signatureData);
         const signatureRemovedData =
           signatureRedoData[signatureRedoData.length - 1];
        signatureRedoArray.current.push(JSON.stringify(signatureRemovedData));
       }
     }
   };

   const handleRedo = () => {
     if (
       signaturePadRef.current &&
       signatureRedoArray.current.length > 0
     ) {
       const values = signaturePadRef.current.toData();
       const lastValue = signatureRedoArray.current.pop();
       if (lastValue) {
        values.push(JSON.parse(lastValue));
         signaturePadRef.current.fromData(values);
       }
     }
   };

   const handleClear = () => {
     if (signaturePadRef.current) {
       signaturePadRef.current.clear();
     }
   };

   useEffect(() => {
     readyPad();
   }, [penColor]);

   return (
     <div className="">
       <div className="my-5">
         <Input
           icon={<User2 size={20} className="stroke-cmhq-gray" />}
           placeholder="Party Name"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
         />
       </div>
       <div id="signature-pad">
         <canvas className="signature-canvas border-2 rounded-xl"></canvas>
         <div className="flex items-center gap-2 mt-3">
           <Button
             onClick={handleSave}
             size="md"
             className="rounded-full flex items-center justify-center w-16 h-16"
             disabled={!partyName || !signaturePadRef.current}
           >
             <Save size={20} />
           </Button>
           <Button
             onClick={handleUndo}
             size="md"
             className="rounded-full flex items-center justify-center w-16 h-16"
           >
             <Undo size={20} />
           </Button>
           <Button
             onClick={handleRedo}
             size="md"
             className="rounded-full flex items-center justify-center w-16 h-16"
           >
             <Redo size={20} />
           </Button>
           <Button
             onClick={handleClear}
             size="md"
             className="rounded-full flex items-center justify-center w-16 h-16"
           >
             <Eraser size={20} />
           </Button>
           <div className="rounded-full w-14 h-14 overflow-hidden">
             <input
               className="w-full h-full"
               type="color"
               onChange={(e) => setPenColor(e.target.value)}
             />
           </div>
         </div>
       </div>
     </div>
   );
}

export default SignaturesPad