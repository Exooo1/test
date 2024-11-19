import styles from './styles-border.module.scss'

export const Border = () => {
    return <div>
        <h1>This is border</h1>
        <div className={styles.borderImageSlice}></div>
        <h1 style={{color:'white',fontSize:95, height:'30px'}}>&#8250;</h1>
        <h1 style={{color:'white', fontSize:25}}>&#9654;</h1>
        <h1 style={{color:'white'}} className={styles.test}></h1>
    </div>
}
