import { useState, useEffect } from 'react'

function useNameValidation(name: string) {
    const [error, setError] = useState(false)
    const [isFirstCheck, setIsFirstCheck] = useState(true)

    useEffect(() => {
        if (isFirstCheck && !name) {
            setIsFirstCheck(false)
            return
        }

        const isValid = (name: string) => {
            if (name.length === 0) {
                return false
            }

            if (name.length > 50) {
                return false
            }

            const pattern = /^[가-힣a-zA-Z]+(?:\s[가-힣a-zA-Z]+)*$/
            return pattern.test(name)
        }

        setError(!isValid(name))
    }, [name])

    return error
}

export default useNameValidation
