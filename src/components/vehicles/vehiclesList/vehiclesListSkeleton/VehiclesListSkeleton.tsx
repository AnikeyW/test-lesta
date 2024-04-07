import styles from "./VehiclesListSkeleton.module.scss";

const vehicleSkeletons = [1, 2, 3, 4, 5, 6, 7];

const VehiclesListSkeleton = () => {
  return (
    <div className={styles.root}>
      {vehicleSkeletons.map((vehicleSkeleton) => (
        <div className={styles.skeleton} key={vehicleSkeleton}>
          <div className={styles.info}>
            <div className={styles.icons}>
              <div className={styles.typeIcon}></div>
              <div className={styles.nationIcon}></div>
              <div className={styles.levelIcon}></div>
            </div>

            <div className={styles.vehicleName}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehiclesListSkeleton;
