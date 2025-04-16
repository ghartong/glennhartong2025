import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function usePolling(searchParam: string | null, ms: number = 60000) {
    const router = useRouter()

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('interval running')
            if (!searchParam) { // if we are not mid-search
                console.log('refreshing data')
                router.refresh()
            }
        }, ms)

        return () => clearInterval(intervalId)
    }, [searchParam, ms]) // eslint-disable-line react-hooks/exhaustive-deps
}