import { useState } from 'react';
import { sessionLoad, sessionSave } from 'arkade/utils/storage-utils';

export function useSession (storageKey, defaultValue) {
    const sessionKey = `ak/useSession/${storageKey}`;
    const value = sessionLoad(sessionKey, defaultValue);
    const [state, setState] = useState(value);

    const setValue = (value) => {
        sessionSave(sessionKey, value);
        setState(value);
    };

    return [state, setValue];
};
