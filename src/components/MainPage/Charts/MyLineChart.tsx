import styles from './Charts.module.css'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import {Typography} from "@mui/material";
import {useAppSelector} from "../../../../hooks";

export const MyLineChart = () => {
    const sellData = useAppSelector((state) => state.tableData.sellData)
    const myData = sellData.map((el) => {
        if (el.remains && el.price){
                return {
                name: el.store + ' ' + el.productName,
                money: (+el.remains * +el.price),
            }
        }
    })


    return(
        <div className={sellData.length > 1 ? styles.content_line : styles.none}>
            <h1 style={{width: '100%', marginBottom: '20px' }}>Total earned </h1>
            <LineChart
                width={400}
                height={100}
                data={myData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis hide={true} dataKey="name" />
                <YAxis hide={true} />
                <Tooltip />
                <Line
                    dot={false}
                    type="linear"
                    dataKey='money'
                    stroke="#1CAF7F"
                    strokeWidth={4}
                    activeDot={{ r: 5 }}
                />
            </LineChart>
            <Typography>${myData.reduce((a, b) =>a + b!.money, 0)}</Typography>
        </div>
    )
}