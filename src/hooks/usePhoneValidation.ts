import { useState, useEffect } from 'react'

function usePhoneValidation(initialPhone: string) {
    const [isFirstCheck, setIsFirstCheck] = useState(true)
    const [phone, setPhone] = useState(initialPhone)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (isFirstCheck) {
            setIsFirstCheck(false)
            return
        }

        const cleanedPhone = phone.replace(/[^\d-]/g, '')

        const numericPhone = cleanedPhone.replace(/-/g, '')

        let formattedPhone
        if (numericPhone.length <= 3) {
            formattedPhone = numericPhone
        } else if (numericPhone.length <= 7) {
            formattedPhone = `${numericPhone.slice(0, 3)}-${numericPhone.slice(3)}`
        } else {
            formattedPhone = `${numericPhone.slice(0, 3)}-${numericPhone.slice(3, 7)}-${numericPhone.slice(7, 11)}`
        }

        setPhone(formattedPhone)

        const isValidPhone = /^(\d{3})-(\d{3,4})-(\d{4})$/.test(formattedPhone)
        setError(!isValidPhone)
    }, [phone])

    return { phone, setPhone, error }
}

export default usePhoneValidation
