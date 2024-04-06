import styles from "./LevelFilter.module.scss";
import { levelsFilterVar } from "../../../../store/Vehicles.ts";
import { useReactiveVar } from "@apollo/client";
import cl from "classnames";

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const LevelFilter = () => {
  const levelsFilter = useReactiveVar(levelsFilterVar);

  const clickHandler = (level: number) => {
    if (levelsFilter.has(level)) {
      const lvls = new Set(levelsFilter);
      lvls.delete(level);
      levelsFilterVar(lvls);
    } else {
      const lvls = new Set(levelsFilter);
      lvls.add(level);
      levelsFilterVar(lvls);
    }
  };

  return (
    <div className={styles.root}>
      {levels.map((level) => (
        <div
          key={level}
          className={cl(styles.levelItem, {
            [styles.selected]: levelsFilter.has(level),
          })}
          onClick={() => clickHandler(level)}
        >
          <div className={styles.title}>{level}</div>
        </div>
      ))}
    </div>
  );
};

export default LevelFilter;
