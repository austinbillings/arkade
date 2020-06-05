import { useState } from 'react';
import { storageLoad, storageSave } from 'arkade/utils/storage-utils';

export function useStorage (storageKey, defaultValue) {
    const storageKey = `ak/useStorage/${storageKey}`;
    const value = storageLoad(storageKey, defaultValue);
    const [state, setState] = useState(value);

    const setValue = (value) => {
        storageSave(storageKey, value);
        setState(value);
    };

    return [state, setValue];
};
