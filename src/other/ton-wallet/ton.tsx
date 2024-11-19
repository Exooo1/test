import {CHAIN, TonConnectButton, useTonAddress, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {useEffect, useState} from "react";
import {TonClient} from "ton";
import {getHttpEndpoint} from "@orbs-network/ton-access";
import {CBet, ControlCenter} from "../../../build/ControlCenter/tact_ControlCenter.ts";
import {Sender, SenderArguments, toNano} from "@ton/core";
import {Address, OpenedContract} from "ton-core";


const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useAsyncInitialize<T>(func: () => Promise<T>, deps: any[] = []) {
    const [state, setState] = useState<T | undefined>();
    useEffect(() => {
        (async () => {
            setState(await func())
        })()
    }, deps)

    return state
}

export function useTonConnect(): {
    sender: Sender;
    connected: boolean;
    wallet: string | null;
    network: CHAIN | null;
} {
    const [tonConnectUI] = useTonConnectUI()
    const wallet = useTonWallet()

    return {
        sender: {
            send: async (args: SenderArguments) => {
                console.log(args.to.toString(), 'args.to')
                console.log(args)
                tonConnectUI.sendTransaction({
                    messages: [
                        {
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            payload: args.body?.toBoc().toString("base64"),
                        },
                    ],
                    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                });
            },
            address: wallet?.account?.address ? Address.parse(wallet?.account?.address as string) : undefined
        },

        connected: !!wallet?.account.address,
        wallet: wallet?.account.address ?? null,
        network: wallet?.account.chain ?? null,
        account: wallet
    }
}

export function useTonClient() {
    const network = useTonWallet()?.account.chain
    return {
        client: useAsyncInitialize(async () => {
            if (!network) return;

            return new TonClient({
                endpoint: await getHttpEndpoint({
                    network: network === CHAIN.MAINNET ? "mainnet" : "testnet"
                })
            })
        }, [network])
    }
}

export function useJettonContract() {
    const {client} = useTonClient()
    const {wallet, sender, account} = useTonConnect()
    const address = useTonAddress()

    const jettonContract = useAsyncInitialize(async () => {
        if (!client || !wallet) return;
        const contract = ControlCenter.fromAddress(Address.parse("EQB7B7xii9OQHltZy0jv1nBBibqavy7YvKn28hPGayxEOcNb"))
        console.log(contract, 'contract')
        return await client.open(contract) as OpenedContract<ControlCenter>
    }, [client, wallet])

    const jettonWalletContract = useAsyncInitialize(async () => {
        if (!jettonContract || !client) return;
        return jettonContract.address
    }, [jettonContract, client])


    // console.log(address, 'address')
    // console.log(account, 'account')
    // const test = Address.parse('0QBFHDQq22HGJAE_K8IE9JJriuCvtZEEiVtfFAVwPsNCO079')
    // const test1 = Address.parse(account?.address)
    // console.log(test, 'test')
    // console.log(test1, 'test1')
    // console.log(test1.toString(), 'test2')
    return {
        jettonWalletAddress: jettonWalletContract,
        mint: async () => {
            const message: CBet = {
                turtleNumber: BigInt(5),
                $$type: 'CBet',
            }
            console.log(message, 'message')
            await jettonContract?.send(sender, {
                value: toNano('0.7'),
            }, message)
        },
        getStatus: async () => {
            const address = await jettonContract?.getTournamentActive()
            console.log(address.toString())
        }
    }
}

export const Ton = () => {
    const [tonConnectUI, setOptions] = useTonConnectUI();
    const wallet = useTonWallet();
    const address = useTonAddress();
    const contract = useJettonContract()
    console.log(contract)
    const handlerOpenTon = () => tonConnectUI.openModal()

    // useEffect(() => {
    //     setOptions({language: 'ru'})//Можно указать язык окна
    // }, []);
    //

    // const getBalance = async () => {
    //     const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
    //     const data = await response.json();
    //     const balanceInNano = data.result;
    //     console.log(balanceInNano)
    // }

    return <div style={{display: 'flex', gap: 10, flexDirection: 'column'}}>
        <TonConnectButton/>
        <button onClick={() => contract.mint()}>ccc</button>
        {/*<button onClick={() => {*/}
        {/*    tonConnectUI.sendTransaction({*/}
        {/*        messages: [*/}
        {/*            {*/}
        {/*                address: 'EQB7B7xii9OQHltZy0jv1nBBibqavy7YvKn28hPGayxEOcNb',*/}
        {/*                amount: '2',*/}
        {/*            },*/}
        {/*        ],*/}
        {/*        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve*/}
        {/*    });*/}
        {/*}}>test*/}
        {/*</button>*/}
        <button onClick={() => {
            contract.getStatus()
        }

        }>getActuve
        </button>
        <h2>Address:{address}</h2>
        <h2>Address:{contract.jettonWalletAddress?.toString()}</h2>
        <h2>Network:{wallet?.account.chain === CHAIN.MAINNET ? 'mainnet' : 'testnet'}</h2>
        {wallet ? null : <button onClick={handlerOpenTon}>OpenModal</button>}
    </div>
}
