import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

let supabase: SupabaseClient

export const initSupabaseClient = async () => {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export const getSupabaseClient = () => {
    return supabase
}

export const configureAuthSupabase = async (accessToken: string) => {
    return supabase.auth.setAuth(accessToken)
}
