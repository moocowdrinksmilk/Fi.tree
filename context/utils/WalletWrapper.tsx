import { ConnectionProvider, useAnchorWallet, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl, Connection } from "@solana/web3.js"
import React, { useMemo } from "react"

interface props {
    children: any
}
require('@solana/wallet-adapter-react-ui/styles.css');


const WalletWrapper = (props: props) => {
    // const network = 'http://127.0.0.1:8899';
    const connection = new Connection(clusterApiUrl('devnet'), {
        commitment: 'confirmed'
    })

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            // new SlopeWalletAdapter(),
            // new SolflareWalletAdapter({ network }),
            // new TorusWalletAdapter(),
            // new LedgerWalletAdapter(),
            // new SolletWalletAdapter({ network }),
            // new SolletExtensionWalletAdapter({ network }),
        ],
        [connection]
    )

    return (
        <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
            <WalletProvider wallets={wallets}>

                {props.children}
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletWrapper