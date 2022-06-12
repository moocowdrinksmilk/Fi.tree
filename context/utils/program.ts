import { Program, Provider } from "@project-serum/anchor"
import idl from '../idl/payment.json'

export const getProgram = async (provider: Provider) => {
    const idlJson = JSON.stringify(idl)
    const parsedIdl = JSON.parse(idlJson)
    return new Program(parsedIdl, "GbCuiWE5qSB9xSBw3t63xN9pcidKDs8PuvzALUySne4F", provider)
}