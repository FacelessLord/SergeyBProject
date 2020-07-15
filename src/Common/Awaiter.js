import {useEffect} from "react";

export function Awaiter({value, setValue, getter, err, base = "pending"}) {
    useEffect(() => {
        async function get() {
            const cats = await getter();
            setValue(cats)
        }

        if (value === base)
            get().catch(r => {
                setValue(err);
                console.log(r)
            })
    }, [value]);
    return value
}
