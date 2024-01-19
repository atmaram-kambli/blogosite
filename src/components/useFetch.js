import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
            
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not able to fetch the data from the server');
                    }
                    return res.json();
                })
                .then(data => {
                    console.log("data fetched!")
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(error => {
                    if(error.name === 'AbortError') {
                        if(!isPending) {
                            return;
                        }
                        console.log("Fetch Error!");
                    }
                    else {
                        setIsPending(false);
                        setError(error.message);
                    }
                })
        }, 1000);
        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;