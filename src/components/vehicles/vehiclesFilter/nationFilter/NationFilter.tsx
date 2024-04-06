import styles from "./NationFilter.module.scss";
import cl from "classnames";
import {
  NationFragmentFragment,
  useGetNationsQuery,
} from "../../../../__generated__/output.ts";
import { useReactiveVar } from "@apollo/client";
import { nationsFilterVar } from "../../../../store/Vehicles.ts";
import NationFilterSkeleton from "./NationFilterSkeleton.tsx";

const NationFilter = () => {
  const { data, loading, error } = useGetNationsQuery({
    variables: { lang: "ru" },
  });

  const nationsFilter = useReactiveVar(nationsFilterVar);

  const clickHandler = (nation: NationFragmentFragment) => {
    if (nationsFilter.has(nation.name!)) {
      const nationNames = new Set(nationsFilter);
      nationNames.delete(nation.name!);
      nationsFilterVar(nationNames);
    } else {
      const nationNames = new Set(nationsFilter);
      nationNames.add(nation.name!);
      nationsFilterVar(nationNames);
    }
  };

  return (
    <div className={styles.root}>
      {data &&
        data.nations?.map((nation) => (
          <div
            key={nation?.name}
            className={cl(styles.nationItem, {
              [styles.selected]: nationsFilter.has(nation?.name!),
            })}
            onClick={() => clickHandler(nation!)}
          >
            <div className={styles.icon}>
              <img src={nation?.icons?.tiny} alt="vehicle-nation" />
            </div>
            <div className={styles.title}>{nation?.title}</div>
          </div>
        ))}

      {loading && <NationFilterSkeleton />}
      {error && <h2>{error.message}</h2>}
    </div>
  );
};

export default NationFilter;
