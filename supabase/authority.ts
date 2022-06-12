import { getSupabaseClient } from './client'

export type Authority = {
    id: string,
    create_at: string,
    user: string
}

export const getAuthorityFromUserPubKey = async (pubkey: string) => {
    try {
        const client = getSupabaseClient()
        const res = await client
        .from<Authority>("authorities")
        .select("id")
        .match({
            user: pubkey
        })
        
        if (!res.body) {
            throw console.error("Supabase error");
        }
        if (res.body?.length < 1) {
            throw console.error("No records found for pubkey: " + pubkey);
        }
        return res.body[0]
    } catch (e) {
        console.log(e.message);
    }
}