import VehiclesList from "./vehiclesList/VehiclesList.tsx";
import styles from "./Vehicles.module.scss";
import VehicleInfo from "./vehicleInfo/VehicleInfo.tsx";
import VehiclesFilter from "./vehiclesFilter/VehiclesFilter.tsx";

const Vehicles = () => {
  return (
    <div className={styles.root}>
      <VehiclesFilter />
      <VehiclesList />
      <VehicleInfo />
    </div>
  );
};

export default Vehicles;
