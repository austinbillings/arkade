import { useState } from 'react';
import { storageLoad, storageSave } from 'arkade/utils/storage-utils';

export function useStorage (storageKey, defaultValue) {
    const localKey = `ak/useStorage/${storageKey}`;
    const value = storageLoad(localKey, defaultValue);
    const [state, setState] = useState(value);

    const setValue = (value) => {
        storageSave(localKey, value);
        setState(value);
    };

    return [state, setValue];
};
