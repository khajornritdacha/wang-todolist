import styles from "./styles.module.css";

export default function SingleTask() {
  const title = "hello world";
  const dueTime = "10.00 PM";
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>{dueTime}</p>
    </div>
  );
}
