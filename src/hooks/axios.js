import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');

    const fetchData = async (params) => {
      try {
       const result = await axios.request(params);
       setResponse(result.data);
       } catch( error ) {
         setError(error);
       }
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, []); // execute once only

    return { response, error };
};