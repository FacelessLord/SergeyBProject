import {useEffect} from "react";

/* eslint-disable react-hooks/exhaustive-deps */
export function Awaiter({value, setValue, getter, err, base = "pending", deps = []}) {
    useEffect(() => {
        async function get() {
            const cats = await getter();
            setValue(cats)
        }

        if (value === base)
            get().catch(() => {
                setValue(err);
            })
    }, [value, ...deps]);
    return value
}
