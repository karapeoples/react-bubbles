import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = props => {
	const [colorList, setColorList] = useState([]);

	useEffect(() => {
		axiosWithAuth()
			.get("/colors")
			.then(res => {
				console.log("API INFO HERE", res);
				setColorList(res.data);
			})
			.catch(error => {
				console.log("None for You", error);
			});
	}, []);

	return (
		<>
			<ColorList colors={colorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
