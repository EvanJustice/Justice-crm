import styles from './Charts.module.css'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import {useSelector} from "react-redux";

export const MyBarChart = () => {
    const sellData = useSelector((state) => state.tableData.sellData)
    const myData = sellData.map((el) => {return {name: el.store + ' ' + el.productName, money: (+el.remains * +el.price), } })
    return (
        <div className={sellData.length > 1 ? styles.content_bar : styles.none}>
            <div className={styles}>
                <h1>Sales Overwiev</h1>
                <h6 className={styles.h6_bar}>graph sales by name</h6>
            </div>
            <BarChart
                width={500}
                height={300}
                barGap={36}
                data={myData}
            >
                <XAxis dataKey="name" />
                <YAxis padding={{ bottom: 50 }} />
                <Tooltip />
                <Bar barSize={48} dataKey="money" fill="#5B6ACD" />
            </BarChart>
        </div>
    )
}