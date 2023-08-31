import styles from './MainPage.module.css'
import {MyPieChart} from "./Charts/MyPieChart.js";
import {MyLineChart} from "./Charts/MyLineChart.js";
import {MyBarChart} from "./Charts/MyBarChart.js";

export const MainPage = () => {
    return (
        <div className={styles.content}>
            <div className={styles.twoCharts}>
                <MyPieChart />
                <MyLineChart />
            </div>
            <MyBarChart />
        </div>
    )
}