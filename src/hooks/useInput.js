import { useState } from "react";

const useInput = initValue => {
    const [inputValue, setInputValue] = useState(initValue||'')
    const setInputValueHandler = (e) => {
        setInputValue(e?.target?.value|| '');
    }
    return [inputValue, setInputValueHandler]
};

export default useInput;
