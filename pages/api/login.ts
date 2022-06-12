import type { NextApiRequest, NextApiResponse } from 'next'
import base58 from 'bs58'
import nacl from 'tweetnacl'

type Data = {
    name: string
}

// export const verifySignature = (req: NextApiRequest) => {
//     const sig = Uint8Array.from(req.body.body.signature.data)
//     const nonce = new TextEncoder().encode("login")
//     const pubkeyDecoded = base58.decode(pubkey)
//     return nacl.sign.detached.verify(nonce, sig, pubkeyDecoded)
// }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const sig = Uint8Array.from(req.body.body.signature.data)
    const nonce = new TextEncoder().encode("Login")
    const pubkey = base58.decode(req.body.body.pubkey)

    const verified = nacl.sign.detached.verify(nonce, sig, pubkey)

    res.status(200).json({ name: 'John Doe' })
}
