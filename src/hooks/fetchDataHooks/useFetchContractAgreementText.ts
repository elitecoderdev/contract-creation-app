import { fetchFunctions } from '../../lib/DataFetchingFunctions';
import { useQuery } from 'react-query';

// Custom hook to fetch contract agreement text
const useFetchContractAgreementText = () => {
    const { data, isLoading, isError, error } = useQuery('contractText', fetchFunctions.fetchContractAgreementText
    );

    return {contractText:data, isLoading: isLoading, isError: isError, error: error };
};

export default useFetchContractAgreementText;
