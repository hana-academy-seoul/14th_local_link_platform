import { BottomNavBar } from "../components/BottomNavBar";
import { SearchBar } from "../components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllLiteratures } from "./literatures/AllLiteratures";
import { DesignLiteratures } from "./literatures/DesignLiterature";
import { MediaLiteratures } from "./literatures/MediaLiterature";

export function Main() {
    return (
        <BrowserRouter>
            <SearchBar />
            <Routes>
                <Route path="/" element={<AllLiteratures/>} />
            </Routes>
            <BottomNavBar />
        </BrowserRouter>
    );
}