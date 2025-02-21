import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const PlaylistFilter = ({ playlists, selectedPlaylist, setSelectedPlaylist }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <h3 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-3">Filter</h3>
            <div className="grid grid-cols-2 gap-2">
                <FilterButton
                    label="All Videos"
                    value="all"
                    selected={selectedPlaylist === "all"}
                    onClick={() => setSelectedPlaylist("all")}
                />
                {playlists.map((playlist) => (
                    <FilterButton
                        key={playlist.id}
                        label={playlist.snippet.title}
                        value={playlist.id}
                        selected={selectedPlaylist === playlist.id}
                        onClick={() => setSelectedPlaylist(playlist.id)}
                    />
                ))}
            </div>
        </div>
    );
};

const FilterButton = ({ label, value, selected, onClick }) => {
    return (
        <button
            className={`flex items-center justify-between px-4 py-2 border rounded-lg transition-all text-gray-700 dark:text-gray-300 
            ${selected ? "bg-sky-300 dark:bg-gray-700 border-sky-500 dark:border-gray-600 text-gray-900 dark:text-gray-100" : "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700"}`}
            onClick={() => onClick(value)}
        >
            <span>{label}</span>
            {selected && <FaCheck className="text-sky-600 dark:text-gray-300" />}
        </button>
    );
};

export default PlaylistFilter;
