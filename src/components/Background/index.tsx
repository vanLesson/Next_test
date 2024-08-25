import styles from "./styles/background.module.css";


export default function Background ({children}){
    return <div className={styles.backGround} >{children}</div>
}
