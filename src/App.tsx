import { useAtom } from 'jotai';
import { darkModeAtom } from './lib/jotai/DarkModeAtom';
import { Button } from './components/ui/Button';
import { SignOut } from './lib/Auth/auth';
import { FilePlus, FileText, LogOut, Trash2} from 'lucide-react';
import { signaturesAtom } from './lib/jotai/SignatureAtom';
import { useAuth } from './hooks/AuthProvider';
import { useEffect, useState } from 'react';

interface ContractData {
  id: string;
  documentName: string;
  content: string;
  signatures: {
    name: string;
    sign: string;
  }[];
}

function App() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [signatureData, setSignatureData] = useAtom(signaturesAtom);
  const [contractData, setContractData] = useState<ContractData[]>([]);
  const {user} = useAuth();
  useEffect(() => {
    setDarkMode(false);
    if(user?.email && signatureData.length > 0){
      const emailVerifiedData = signatureData.find(
        (document) => document.email === user.email
      )
      if(emailVerifiedData){
        
        if(emailVerifiedData.contracts.length > 0){
          setContractData(emailVerifiedData.contracts)
        }
      }
      
    }
  }, [contractData, signatureData, user]);

  const deleteDocument = (documentId: string) => {
    window.location.reload();
    setSignatureData((prevData) => {
      const userIndex = prevData.findIndex(
        (contract) => contract.email === user?.email
      );

      if (userIndex !== -1) {
        // If the user exists, update the contracts array
        const updatedContracts = [...prevData];
        const userContracts = [...prevData[userIndex].contracts];

        const existingContractIndex = userContracts.findIndex(
          (doc) => doc.id === documentId
        );

        if (existingContractIndex !== -1) {
          // If the document exists, delete it
          userContracts.splice(existingContractIndex, 1);
          updatedContracts[userIndex] = {
            ...prevData[userIndex],
            contracts: userContracts,
          };
          return updatedContracts;
        }
      }

      // If the user doesn't exist or the document doesn't exist, return the unchanged data
      return prevData;
    });
  };

  return (
    <div className={`${darkMode && 'dark'} dh w-full`}>
      <header className="md:px-20 md:py-10 px-10 py-5 flex items-center justify-between border-b">
        <h4 className="md:text-[3.2rem] text-[1.8rem]">Create Contract Document</h4>
        <div className='flex items-center gap-3'>
          <Button className="mr-5 flex items-center gap-3" onClick={() => window.location.href = "/create"}>
            <FilePlus size={20} />
            <span className="ml-2 md:block hidden">New Document</span>
          </Button>
          <Button onClick={SignOut}>
            <LogOut size={20} />
            <span className="ml-2 md:block hidden">Sign Out</span>
          </Button>
        </div>
      </header>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5  md:grid-cols-3 grid-cols-1 gap-10 p-20">
        {contractData.length === 0 && (
          <a
            href="/create"
            target="_blank"
            className="flex items-center justify-center flex-col p-6 rounded-xl space-y-4 cursor-pointer shadow-md hover:scale-105 transition-all duration-200 ease-in-out bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
          >
            <FilePlus size={80} color="white" />
            <h5 className="title1-mobile text-white">Add Contract</h5>
          </a>
        )}
        {contractData.length > 0 &&
          contractData.map((signature, i) => (
            <a
              href={`/edit/${signature.id}`}
              target="_blank"
              className="relative flex items-center justify-center flex-col p-6 rounded-xl space-y-4 cursor-pointer shadow-md hover:scale-105 transition-all duration-200 ease-in-out hover:bg-gray-100"
              key={i}
            >
              <Button
                variant="outline"
                size="md"
                className="absolute right-5 top-5 bg-red-300 border-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteDocument(signature.id);
                }}>
                  <Trash2 size={20} className="stroke-red-600"/>
                </Button>
              <FileText size={80} color="black" />
              <h5 className="title1-mobile text-center">
                {signature.documentName}
              </h5>
            </a>
          ))}
      </div>
    </div>
  );
}

export default App;
