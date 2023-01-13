const fetchData = async <T>(url: string): Promise<T | null> => {

    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Bad response', { cause: { response } })
        }
        const data = await response.json()

        return data
    } catch (err) {
        if (err instanceof Error) console.error('FetchData ' + err.message)
        return null
    }


}

export { fetchData }