import React, { useState, useEffect, useContext } from "react";
import { HorizontalScrollList } from "./horizontal-scroll-list";
import { Context } from "../store/appContext";

export const Vehicles = () => {
	const { store, actions } = useContext(Context);
	const [vehicles, setVehicles] = useState([]);

	useEffect(() => {
		vehiclesProcess();
	}, []);

	async function vehiclesProcess() {
		await getVehicles();
		localStorage.setItem("vehicles", JSON.stringify(store.vehiclesResponseJSON));
		const vehiclesMap = mapVehicles();
		setVehicles(vehiclesMap);
	}

	async function getVehicles() {
		await actions.fetchGetVehicles();
	}

	function mapVehicles() {
		let jsonMap = [];
		if (store.vehiclesResponseJSON.results) {
			jsonMap = store.vehiclesResponseJSON.results.map(function(vehicle, index) {
				let details = ["Fabricante: " + vehicle.manufacturer, "Modelo: " + vehicle.model];
				return {
					name: vehicle.name,
					details: details
				};
			});
		}
		return jsonMap;
	}

	return <HorizontalScrollList listName={"Vehiculos"} items={vehicles} link={"vehicle"} />;
};
