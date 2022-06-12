import { BN, web3 } from "@project-serum/anchor";

export type Product = {
    price: BN,
    authorityGroup: web3.PublicKey,
    payee: web3.PublicKey,
    tokenAccount: web3.PublicKey
}