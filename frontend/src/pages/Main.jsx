import { BottomNavBar } from "../components/BottomNavBar";
import { SearchBar } from "../components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllLiteratures } from "./literatures/AllLiteratures";
import { DesignLiteratures } from "./literatures/DesignLiteratures";
import { MediaVideos } from "./literatures/MediaVideos";
import { StudyLiterature } from "./literatures/StudyLiteratures";
import { LikedLiteratures } from "./literatures/LikedLiteratures";

export function Main() {
    return (
        <BrowserRouter>
            <SearchBar />
            <Routes>
                <Route path="/" element={<AllLiteratures/>} />
                <Route path="/design" element={<DesignLiteratures/>} />
                <Route path="/media" element={<MediaVideos/>} />
                <Route path="/academic" element={<StudyLiterature/>} />
                <Route path="/likes" element={<LikedLiteratures/>} />
            </Routes>
            <BottomNavBar />
        </BrowserRouter>
    );
}