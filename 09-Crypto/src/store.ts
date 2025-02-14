
import { create } from "zustand";
import { Cryptocurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies : Cryptocurrency,
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchDaTa: (pair:Pair) => Promise<void>
}



export const useCryptoStore = create<CryptoStore>((set) => ({
    cryptocurrencies: [],
    result:{
            IMAGEURL : '',
            PRICE: '',
            HIGHDAY: '',
            LOWDAY: '',
            CHANGEPCT24HOUR: '',
            LASTUPDATE: ''
    },
    loading: false,

    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },
    fetchDaTa : async (pair) => {
        set(() => ({
            loading: true
        }))
        const result =await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result,
            loading: false
        }))
        
    }
}));