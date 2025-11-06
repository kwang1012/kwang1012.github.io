import axios from 'axios';
import { useEffect } from 'react';

export function useVisitor() {
  useEffect(() => {
    axios
      .get('https://ipgeolocation.abstractapi.com/v1/', {
        params: {
          api_key: import.meta.env.VITE_GEO_API_KEY,
        },
      })
      .then(({ data }) => {})
      .catch(console.log);
  }, []);
}
