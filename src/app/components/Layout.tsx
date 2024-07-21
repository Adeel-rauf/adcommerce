'use client'

import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {SessionProvider} from "next-auth/react";

export default function Layout({children}:{children:React.ReactNode}) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </PersistGate>
            </Provider>
    );
}
