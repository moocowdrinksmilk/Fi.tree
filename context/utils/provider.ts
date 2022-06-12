import { AnchorProvider, Provider, web3 } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export const getProvider = async (wallet:AnchorWallet) => {
    if (!wallet) {
        return
    }
    const network = process.env.NEXT_PUBLIC_ANALYTICS_ID as string;
    const conn = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
    return new AnchorProvider(conn, wallet, {
        preflightCommitment: "confirmed",
        commitment: "confirmed"
    })
}