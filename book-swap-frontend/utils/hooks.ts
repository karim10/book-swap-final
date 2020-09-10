import { useState, useEffect, useCallback, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';


const resInitialState = {
    data: null,
    isLoading: false,
    error: false
}

interface FetchState {
    data: any;
    isLoading: boolean;
    error: boolean;
}

export const useFetch = (initalReqConfig: AxiosRequestConfig): [FetchState, React.Dispatch<React.SetStateAction<AxiosRequestConfig>>] => {
    const [reqConfig, setReqConfig] = useState(initalReqConfig);
    const [res, setRes] = useState<FetchState>(resInitialState);
    console.log("requestConfig: ", reqConfig);
    useDidUpdate(() => {
        setRes({ ...resInitialState, isLoading: true })
        axios(reqConfig).then(response => setRes({
            ...resInitialState, data: response.data
        })).catch((e) => {
            setRes({ ...resInitialState, error: true });
            console.log("Error: ", e);
        })
    }, [reqConfig]);
    return [res, setReqConfig];
}

const getError = (error: Error) => `${error.message} || ${error.name} || ${error.stack}`;

export const useFetchData = (req: AxiosRequestConfig, deps: any): [FetchState, () => void] => {
    const [res, setRes] = useState({ data: null, error: null, isLoading: false });
    // You POST method here
    const hasMount = useRef(false);
    let callAPI;
    if (hasMount.current) {
        useEffect(() => {
            callAPI = useCallback(() => {
                setRes(prevState => ({ ...prevState, isLoading: true }));
                axios(req).then(res => {
                    setRes({ data: res.data, isLoading: false, error: null });
                }).catch((error: Error) => {
                    setRes({ data: null, isLoading: false, error: getError(error) });
                })
            }, [req, deps]);
        })
    } else {
        hasMount.current = true
        callAPI = undefined;
    }
    return [res, callAPI];
}

export const usePostEndPoint = (req: AxiosRequestConfig, callback: any) => {
    const [res, setRes] = useState<FetchState>(resInitialState);
    const apiCall = () => {
        useEffect(() => {
            async function postData() {
                setRes({ ...resInitialState, isLoading: true })
                await axios(req).then(response => {
                    console.log(response);
                    setRes({
                        ...resInitialState, data: response.data
                    })
                }).catch(() => setRes({ ...resInitialState, error: true }))
            };
            postData();
        }, []);
    }
    return [res];
}

export function useDidUpdate(callback, deps) {
    const hasMount = useRef(false)

    useEffect(() => {
        if (hasMount.current) {
            callback()
        } else {
            hasMount.current = true
        }
    }, deps)
}

export function useDidUpdateEffect(fn, inputs) {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current)
            fn();
        else
            didMountRef.current = true;
    }, inputs);
}