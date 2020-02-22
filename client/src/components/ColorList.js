import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
	color: "",
	code: { hex: "" },
};

const ColorList = ({ colors }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const [shiny, setShiny] = useState(initialColor);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
		console.log(color);
	};

	const saveEdit = e => {
		e.preventDefault();
		axiosWithAuth()
			.put(`/colors/${colorToEdit.id}`, colorToEdit)
			.then(res => {
				console.log("API INFO HERE", res);
				setColorToEdit(initialColor);
				window.location.reload(false);
			})
			.catch(error => {
				console.log("None for You", error);
			});
	};

	const deleteColor = color => {
		axiosWithAuth()
			.delete(`/colors/${color.id}`)
			.then(res => {
				console.log(res);
				window.location.reload(false);
			})

			.catch(err => console.log(err));
	};

	const addBubble = e => {
		e.preventDefault();
		setShiny({ ...shiny });
		axiosWithAuth()
			.post("/colors", shiny)
			.then(res => {
				setShiny(initialColor);
				window.location.reload(false);
			})
			.catch(err => console.log("No bubbles", err));
	};
	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={e => {
									e.stopPropagation();
									deleteColor(color);
								}}>
								x
							</span>{" "}
							{color.color}
						</span>
						<div className="color-box" style={{ backgroundColor: color.code.hex }} />
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input onChange={e => setColorToEdit({ ...colorToEdit, color: e.target.value })} value={colorToEdit.color} />
					</label>
					<label>
						hex code:
						<input
							type="color"
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value },
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}

			<div />
			<form onSubmit={addBubble}>
				<legend>Add Button</legend>
				<label>
					color name:
					<input onChange={e => setShiny({ ...shiny, color: e.target.value })} value={shiny.color} />
				</label>
				<label>
					hex code:
					<input
						type="color"
						onChange={e =>
							setShiny({
								...shiny,
								code: { hex: e.target.value },
							})
						}
						value={shiny.code.hex}
					/>
				</label>
				<div className="button-row">
					<button type="submit">Add Bubble</button>
				</div>
			</form>
		</div>
	);
};

export default ColorList;
