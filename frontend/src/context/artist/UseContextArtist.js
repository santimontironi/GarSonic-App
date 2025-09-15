import { useContext } from "react";
import { ArtistContext } from "./ArtistContext";

export function UseContextArtist() {
    return useContext(ArtistContext);
}