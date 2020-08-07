import {useEffect} from "react";

/* eslint-disable react-hooks/exhaustive-deps */
export function Awaiter({value, setValue, getter, err, base = "pending", deps = []}) {
    useEffect(() => {
        async function get() {
            const cats = await getter();
            setValue(cats)
        }

        if (value === base)
            get().catch(r => {
                console.log(r)
                setValue(err);
            })
    }, [value, ...deps]);
    return value
}

export function useAwait(value, setter, getter, awhile = v => !!v, err, deps = null) {
    if (!deps)
        deps = []
    useEffect(() => {
        if (awhile(value))
            getter().then(setter).catch(r => setter(err))
    }, deps)
}

export function useAwaitWrap(value, setter, getter, until = v => !!v, wrap, err, deps = null) {
    if (!deps)
        deps = []
    useEffect(() => {
        if (until(value))
            getter().then(setter).catch(r => setter(err))
    }, deps)
    if (!until(value) && value.err !== err)
        return wrap(value)
    return err
}