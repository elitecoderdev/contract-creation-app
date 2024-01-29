import { FC } from 'react'

interface ContractSignatureProps {
  signatures : {
    name: string;
    sign: string;
  }[];
}

// ContractSignature component displays a list of signatures with names and images
const ContractSignature: FC<ContractSignatureProps> = ({signatures}) => {
  return (
    <div className="flex items-center mt-10 flex-wrap gap-4 flex-shrink-0">
      {signatures.map((signature, i) => (
        <div className="flex flex-col items-center gap-5" key={i}>
          <img
            src={signature.sign}
            alt={signature.name}
            className="w-40 h-20"
          />
          <p>{signature.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ContractSignature