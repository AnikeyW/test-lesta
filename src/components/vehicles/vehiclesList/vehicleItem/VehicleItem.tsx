import styles from "./VehicleItem.module.scss";
import { FC } from "react";
import { VehicleFragmentFragment } from "../../../../__generated__/output.ts";
import { selectedVehicleVar } from "../../../../store/Vehicles.ts";

interface Props {
  data: VehicleFragmentFragment;
}

const VehicleItem: FC<Props> = ({ data }) => {
  const clickHandler = async () => {
    selectedVehicleVar({ ...data });
  };

  return (
    <div className={styles.root} onClick={clickHandler}>
      <div className={styles.image}>
        <img src={data.icons?.medium} alt="vehicle-icon" />
      </div>

      <div className={styles.info}>
        <div className={styles.icons}>
          <div className={styles.infoItem}>
            <div className={styles.typeIcon}>
              <img src={data.type?.icons?.default} alt="typeIcon" />
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.nationIcon}>
              <img src={data.nation?.icons?.tiny} alt="nationIcon" />
            </div>
          </div>

          <div className={styles.infoItem}>{data.level}</div>
        </div>

        <div className={styles.vehicleName}>{data.title}</div>
      </div>
    </div>
  );
};

export default VehicleItem;
