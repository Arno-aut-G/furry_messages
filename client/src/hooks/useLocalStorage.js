import { useState, useEffect } from "react"

//this is for being able to identify to which app the information in localStorage belongs to
const PREFIX = 'komunikate_messenger-'


export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        //in useState we have a callback function, so that the block is only executed once
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue !== null) return JSON.parse(jsonValue)
        //if the value stored is not a json, but a function, execute this function, otherwise return the initialValue
        if (typeof initalValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])
    
    return [value, setValue]
}
