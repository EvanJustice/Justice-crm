import styles from './MainPage.module.css'
import {MyPieChart} from "./charts/MyPieChart.jsx";
import {MyLineChart} from "./charts/MyLineChart.jsx";
import {MyBarChart} from "./charts/MyBarChart.jsx";
export const MainPage = () =>{

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