import styles from "./TypeFilterSkeleton.module.scss";

const types = [1, 2, 3, 4, 5];

const TypeFilterSkeleton = () => {
  return (
    <div className={styles.root}>
      {types.map((type) => (
        <div className={styles.typeItem} key={type}>
          <div className={styles.icon}></div>
          <div className={styles.title}></div>
        </div>
      ))}
    </div>
  );
};

export default TypeFilterSkeleton;
