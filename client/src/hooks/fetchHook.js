import axios from "axios";
import { useState, useEffect } from 'react'
import { getUsername } from '../helper/helper'

// Custom Hook
export default function useFetch(query) {
    const [getData, setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }))

                // Get username
                const { username } = !query ? await getUsername() : ''

                // Fetch Query
                const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`)

                if (status === 201) {
                    setData(prev => ({ ...prev, isLoading: false }))
                    setData(prev => ({ ...prev, apiData: data, status: status }))
                }

                setData(prev => ({ ...prev, isLoading: false }))
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        }
        fetchData()
    }, [query])

    return [getData, setData]
}