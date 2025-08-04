// src/components/Layout.js
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
        }}>
            <Header />
            <main style={{
                padding: "20px",
                maxWidth: "1200px",
                margin: "0 auto",
                minHeight: "calc(100vh - 70px)"
            }}>
                <Outlet />
            </main>
        </div>
    );
}