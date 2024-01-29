
export const fetchFunctions = {
  fetchContractAgreementText : fetchContractAgreementText,
}

async function fetchContractAgreementText (){
    const response = await fetch('/data.json');
    const jsonData = await response.json();
    return jsonData.agreementText;
};