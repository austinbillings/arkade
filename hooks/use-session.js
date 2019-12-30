import { useState } from 'react';
import { sessionLoad, sessionSave } from 'arkade/utils/session-utils';

export const useSession = (storageKey, defaultValue) => {
    const sessionKey = `useSession:${storageKey}`;
    const value = sessionLoad(sessionKey, defaultValue);
    const [state, setState] = useState(value);

    const setValue = (value) => {
        sessionSave(sessionKey, value);
        setState(value);
    };

    return [state, setValue];
};
