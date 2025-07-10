// src/components/Layout.js
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <>
            <Header />
            <main style={{ padding: "20px" }}>
                <Outlet />
            </main>
        </>
    );
}