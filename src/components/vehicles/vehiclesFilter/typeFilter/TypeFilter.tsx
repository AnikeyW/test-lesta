import {
  useGetTypesQuery,
  VehicleType,
} from "../../../../__generated__/output.ts";
import styles from "./TypeFilter.module.scss";
import { typesFilterVar } from "../../../../store/Vehicles.ts";
import { useReactiveVar } from "@apollo/client";
import cl from "classnames";
import TypeFilterSkeleton from "./TypeFilterSkeleton.tsx";

const TypeFilter = () => {
  const { data, loading, error } = useGetTypesQuery({
    variables: { lang: "ru" },
  });

  const typesFilter = useReactiveVar(typesFilterVar);

  const clickHandler = (type: VehicleType) => {
    if (typesFilter.has(type.name!)) {
      const typesNames = new Set(typesFilter);
      typesNames.delete(type.name!);
      typesFilterVar(typesNames);
    } else {
      const typesNames = new Set(typesFilter);
      typesNames.add(type.name!);
      typesFilterVar(typesNames);
    }
  };

  return (
    <div className={styles.root}>
      {data &&
        data.vehicleTypes?.map((type) => (
          <div
            key={type?.name}
            className={cl(styles.typeItem, {
              [styles.selected]: typesFilter.has(type?.name!),
            })}
            onClick={() => clickHandler(type!)}
          >
            <div className={styles.icon}>
              <img src={type?.icons?.normal} alt="vehicle-type" />
            </div>
            <div className={styles.title}>{type?.title}</div>
          </div>
        ))}

      {loading && <TypeFilterSkeleton />}
      {error && <h2>{error.message}</h2>}
    </div>
  );
};

export default TypeFilter;
