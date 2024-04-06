import styles from "./VehicleInfo.module.scss";
import { useReactiveVar } from "@apollo/client";
import { useGetVehicleByIdLazyQuery } from "../../../__generated__/output.ts";
import { selectedVehicleVar } from "../../../store/Vehicles.ts";
import { useEffect } from "react";
import cl from "classnames";
import { AnimatePresence, motion } from "framer-motion";

const VehicleInfo = () => {
  const selectedVehicle = useReactiveVar(selectedVehicleVar);
  const [getVehicleById, { data, error, loading }] = useGetVehicleByIdLazyQuery(
    { errorPolicy: "ignore" },
  );

  useEffect(() => {
    if (!selectedVehicle) return;
    getVehicleById({
      variables: { lang: "ru", id: selectedVehicle.id },
    });
  }, [selectedVehicle?.id]);

  return (
    <AnimatePresence>
      {selectedVehicle && !loading && (
        <motion.div
          className={styles.root}
          initial={{ top: "-100%" }}
          animate={{ top: "0" }}
        >
          {data && (
            <>
              <h2 className={styles.title}>{data.vehicles![0]!.title}</h2>

              <div className={styles.image}>
                <img src={data.vehicles![0]!.icons?.medium} alt="" />
              </div>

              <div className={cl(styles.type, styles.row)}>
                <span className={styles.titleKey}>Класс:</span>

                <div className={styles.typeIcon}>
                  <img
                    src={data.vehicles![0]!.type?.icons?.default}
                    alt="typeIcon"
                  />
                </div>
                <div className={styles.typeTitle}>
                  {data.vehicles![0]!.type?.title}
                </div>
              </div>

              <div className={cl(styles.nation, styles.row)}>
                <span className={styles.titleKey}>Страна:</span>
                <div className={styles.nationIcon}>
                  <img
                    src={data.vehicles![0]!.nation?.icons?.tiny}
                    alt="nationIcon"
                  />
                </div>
                <div className={styles.nationTitle}>
                  {data.vehicles![0]!.nation?.title}
                </div>
              </div>

              <div className={cl(styles.level, styles.row)}>
                <span className={styles.titleKey}>Уровень:</span>
                {data.vehicles![0]!.level}
              </div>

              <div className={styles.description}>
                {data.vehicles![0]!.description}
              </div>
            </>
          )}
          {error && <p>{error.message}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VehicleInfo;
