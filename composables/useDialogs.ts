import {openDialog} from 'vue3-promise-dialog';
import Confirm from "~/components/Dialog/Confirm.vue";
import Wallet from "~/components/Dialog/Wallet.vue";
import Transaction from "~/components/Dialog/Transaction.vue";
import type {ITransaction, IWallet} from "~/types";


export const useAsyncConfirmDialog = ({title, message}: {
    title: string,
    message: string
}): Promise<boolean> => openDialog(Confirm, {
    title,
    message
});


export const useWalletDialog = (value: IWallet | undefined = undefined): Promise<boolean> => openDialog(Wallet, {
    value
});
export const useTransactionDialog = (wallet: IWallet, value: ITransaction | undefined = undefined): Promise<boolean | any> => openDialog(Transaction, {
    wallet,
    value
});
