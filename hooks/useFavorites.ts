import { useEffect, useState } from "react";

export const useFavorites = () => {
	const [favorites, setFavorites] = useState<string[]>([]);

	useEffect(() => {
		const saved = localStorage.getItem("favorites");
		if (saved) setFavorites(JSON.parse(saved));
	}, []);

	const toggleFavorite = (id: string) => {
		const newFavorites = favorites.includes(id)
			? favorites.filter((fav) => fav !== id)
			: [...favorites, id];

		setFavorites(newFavorites);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	};

	return { favorites, toggleFavorite };
};
