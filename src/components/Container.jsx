import styles from "./container.module.css";

export default function Conatainer({ children }) {
  return <div className={styles.parentContainer}>{children}</div>;
}
