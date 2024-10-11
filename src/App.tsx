import './App.css'
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';
import {IndexComponent} from "./components";
import {IndexCss} from "./css";
import {TonConnectButton, useTonWallet} from "@tonconnect/ui-react";
import {useEffect, useState} from "react";

const useTest = () => {
    const [test, setTest] = useState('')
    return {test, setTest}
}

function App() {
    const wallet = useTonWallet();
    const getBalance = async (address: string) => {
        try {
            // Используем API toncenter.com для запроса баланса по адресу кошелька
            const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
            const data = await response.json();
            const balanceInNano = data.result;  // Баланс в нанотонах
            const balanceInTON = parseFloat(balanceInNano) / 10 ** 9;  // Преобразуем нанотоны в тоны
            console.log(balanceInTON, 'balanceInTON')
        } catch (error) {
            console.error("Ошибка при получении баланса:", error);
        }
    };

    // Получаем баланс, когда кошелек подключен
    useEffect(() => {
        if (wallet && wallet.account) {
            getBalance(wallet.account.address);  // Передаем адрес кошелька
        }
    }, [wallet]);
    const {test,setTest} = useTest()
    const two = useTest()
    return (
        <>
            <h1>Vite + React</h1>
            <IndexComponent/>
            <IndexCss/>
            <TonConnectButton/>
            <p>{test}</p>
            <input type="text" onChange={e => setTest(e.target.value)} value={test} />
            <p>{two.test}</p>
            <input type="text" onChange={e => two.setTest(e.target.value)} value={two.test} />
        </>
    )
}

export default App
