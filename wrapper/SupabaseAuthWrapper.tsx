import { useEffect } from "react"
import { getSupabaseClient, configureAuthSupabase, initSupabaseClient } from '../supabase/client'

interface AuthProps {
    children: any
}

const SupabaseWrapper = (AuthProps: AuthProps) => {
    useEffect(() => {
        const addAuth = async () => {
            initSupabaseClient()
            const supabase = getSupabaseClient()
            if (!supabase) {
                return
            }
            const session= supabase.auth.session()
            if (session) {
                console.log(session);
                
                configureAuthSupabase(session?.access_token)
            } else {
                console.log("Hello");
                
            }
        }
        addAuth()
    }, [])
    return (
        <>
            {AuthProps.children}
        </>
    )
}

export default SupabaseWrapper