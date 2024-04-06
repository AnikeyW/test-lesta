import styles from "./VehiclesFilter.module.scss";
import TypeFilter from "./typeFilter/TypeFilter.tsx";
import NationFilter from "./nationFilter/NationFilter.tsx";
import LevelFilter from "./levelFilter/LevelFilter.tsx";

const VehiclesFilter = () => {
  return (
    <div className={styles.root}>
      <h2>Фильтр</h2>
      <TypeFilter />
      <NationFilter />
      <LevelFilter />
    </div>
  );
};

export default VehiclesFilter;
