import { PublicKey } from '@solana/web3.js'
import { Authority } from './authority'
import { getSupabaseClient } from './client'

export type Product = {
    id: string
    authority: string
    name: string
    category: string
    pricing_model: string
    price: number
    recurring: boolean
    billing_cycle: number
    shipping: number
    description: string
    created_at: string
}

export const getProductSupa = async(pubkey: PublicKey) => {
    try {
        const supabase = getSupabaseClient()
        const res = await supabase
        .from<Product>('product')
        .select(`
            *,
            authorities:id
        `)
        

        return res.data
    } catch(e) {
        console.log(e.message);
        
    }
}

export const addProductSupa = async(
    id: string,
    authority: string,
    name: string,
    category: string,
    pricing_model: string, 
    price: number, 
    recurring: boolean,
    billing_cycle: number,
    shipping: number,
    description: string
    ) => {
    try {
        const supabase = getSupabaseClient()
        const res = await supabase
        .from<Product>('product')
        .insert([
            {
                id,
                authority,
                name,
                category,
                pricing_model,
                price,
                recurring,
                billing_cycle,
                shipping,
                description
            }
        ])
    } catch(e) {
        console.log(e.message);
        
    }
}