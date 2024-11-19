import './App.css'
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';
import {IndexOther} from "./other";


function App() {
    // const wallet = useTonWallet();
    // const getBalance = async (address: string) => {
    //     try {
    //         // Используем API toncenter.com для запроса баланса по адресу кошелька
    //         const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
    //         const data = await response.json();
    //         const balanceInNano = data.result;  // Баланс в нанотонах
    //         const balanceInTON = parseFloat(balanceInNano) / 10 ** 9;  // Преобразуем нанотоны в тоны
    //         console.log(balanceInTON, 'balanceInTON')
    //     } catch (error) {
    //         console.error("Ошибка при получении баланса:", error);
    //     }
    // };

    // // Получаем баланс, когда кошелек подключен
    // useEffect(() => {
    //     if (wallet && wallet.account) {
    //         getBalance(wallet.account.address);  // Передаем адрес кошелька
    //     }
    // }, [wallet]);

    return (
        //Other
        <>
            <h1>Other</h1>
            <IndexOther/>
        </>
        // //React
        // <>
        //     <h1>React</h1>
        //     <IndexComponent/>
        // </>
        //CSS
        // <>
        //     <IndexCss/>
        // </>
        // <>
    )
}

export default App
