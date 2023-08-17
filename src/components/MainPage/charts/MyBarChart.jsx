import styles from './Charts.module.css'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import {useSelector} from "react-redux";

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
];

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