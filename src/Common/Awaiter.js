import {useEffect} from "react";

export function Awaiter({value, setValue, getter, err}) {
    useEffect(() => {
        async function get() {
            const cats = await getter();
            setValue(cats)
        }
        if (value === "pending")
            get().catch(r => {
                setValue(err);
                console.log(r)
            })
    }, [value]);
    return value
}
