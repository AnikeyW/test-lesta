import VehicleItem from "./vehicleItem/VehicleItem.tsx";
import { useGetVehiclesQuery } from "../../../__generated__/output.ts";
import styles from "./VehiclesList.module.scss";
import { useReactiveVar } from "@apollo/client";
import {
  levelsFilterVar,
  nationsFilterVar,
  typesFilterVar,
} from "../../../store/Vehicles.ts";
import { useMemo } from "react";
import VehiclesListSkeleton from "./vehiclesListSkeleton/VehiclesListSkeleton.tsx";

const VehiclesList = () => {
  const { data, loading, error } = useGetVehiclesQuery({
    variables: { lang: "ru" },
  });

  const typesFilter = useReactiveVar(typesFilterVar);
  const levelsFilter = useReactiveVar(levelsFilterVar);
  const nationsFilter = useReactiveVar(nationsFilterVar);

  const filteredVehicles = useMemo(() => {
    if (!data) return [];

    if (
      nationsFilter.size === 0 &&
      typesFilter.size === 0 &&
      levelsFilter.size === 0
    ) {
      return data.vehicles;
    }

    let filterCondition: boolean;

    return data.vehicles?.filter((vehicle) => {
      if (nationsFilter.size !== 0) {
        filterCondition = nationsFilter.has(vehicle?.nation?.name!);
      }
      if (typesFilter.size !== 0) {
        filterCondition = typesFilter.has(vehicle?.type?.name!);
      }
      if (levelsFilter.size !== 0) {
        filterCondition = levelsFilter.has(vehicle?.level!);
      }

      if (nationsFilter.size !== 0 && typesFilter.size !== 0) {
        filterCondition =
          nationsFilter.has(vehicle?.nation?.name!) &&
          typesFilter.has(vehicle?.type?.name!);
      }
      if (nationsFilter.size !== 0 && levelsFilter.size !== 0) {
        filterCondition =
          nationsFilter.has(vehicle?.nation?.name!) &&
          levelsFilter.has(vehicle?.level!);
      }
      if (typesFilter.size !== 0 && levelsFilter.size !== 0) {
        filterCondition =
          typesFilter.has(vehicle?.type?.name!) &&
          levelsFilter.has(vehicle?.level!);
      }

      if (
        nationsFilter.size !== 0 &&
        typesFilter.size !== 0 &&
        levelsFilter.size !== 0
      ) {
        filterCondition =
          nationsFilter.has(vehicle?.nation?.name!) &&
          typesFilter.has(vehicle?.type?.name!) &&
          levelsFilter.has(vehicle?.level!);
      }

      if (filterCondition) {
        return vehicle;
      }
      return false;
    });
  }, [data?.vehicles, nationsFilter.size, typesFilter.size, levelsFilter.size]);

  return (
    <div className={styles.root}>
      {filteredVehicles &&
        filteredVehicles.map((vehicle) => (
          <VehicleItem key={vehicle?.id} data={vehicle!} />
        ))}

      {loading && <VehiclesListSkeleton />}
      {error && <h2>{error.message}</h2>}
    </div>
  );
};

export default VehiclesList;
