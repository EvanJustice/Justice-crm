import styles from './MainPage.module.css'
import {MyPieChart} from "./Charts/MyPieChart.js";
import {MyLineChart} from "./Charts/MyLineChart.js";
import {MyBarChart} from "./Charts/MyBarChart.js";
import {useAppSelector} from "../../../hooks";



export const MainPage = () => {
    const sellData = useAppSelector((state) => state.tableData.sellData)
    return (
        <div className={sellData.length > 1 ? styles.content_ : styles.content}>
            <div className={styles.twoCharts}>
                <MyPieChart />
                <MyLineChart />
            </div>
            <MyBarChart />
        </div>
    )
}