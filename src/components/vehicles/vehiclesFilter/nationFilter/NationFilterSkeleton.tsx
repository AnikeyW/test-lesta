import styles from "./NationFilterSkeleton.module.scss";

const nations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const NationFilterSkeleton = () => {
  return (
    <div className={styles.root}>
      {nations.map((nation) => (
        <div className={styles.nationItem} key={nation}>
          <div className={styles.icon}></div>
          <div className={styles.title}></div>
        </div>
      ))}
    </div>
  );
};

export default NationFilterSkeleton;
