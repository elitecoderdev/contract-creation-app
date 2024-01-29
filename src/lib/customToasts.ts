import { toast } from 'react-hot-toast';

function customToastSuccess(message:string){
    const darkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
    toast.success(`${message}`, {
      style: {
        backgroundColor: darkMode ? '#000000' : '#FFFFFF',
        color: darkMode ? '#F3F4F6' : '#1F2937',
      },
    });
}

function customToastError(message: string) {
  const darkMode = JSON.parse(
    localStorage.getItem('darkMode') || 'false'
  );
  toast.error(`${message}`, {
    style: {
      backgroundColor: darkMode ? '#000000' : '#FFFFFF',
      color: darkMode ? '#F3F4F6' : '#1F2937',
    },
  });
}

export {customToastSuccess, customToastError}
