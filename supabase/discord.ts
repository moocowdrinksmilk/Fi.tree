import { getSupabaseClient } from './client'

export const login = async () => {
    const supabase = getSupabaseClient()
    const { user, session, error } = await supabase.auth.signIn({
        provider: 'discord',
      })
      console.log(user);
      
}

export const getSession = async () => {
    const supabase = getSupabaseClient()
    const session = supabase.auth.session()
    return session
}