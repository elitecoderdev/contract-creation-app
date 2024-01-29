import { FC } from 'react'

interface LoadingScreenProps {
  
}

const LoadingScreen: FC<LoadingScreenProps> = ({}) => {
  return (
    <div className="dh flex items-center justify-center">
      <h1>Loading...</h1>
    </div>
  );
}

export default LoadingScreen