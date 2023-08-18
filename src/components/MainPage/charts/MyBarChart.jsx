import styles from './Charts.module.css'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import {useSelector} from "react-redux";
import {makeStyles} from "@mui/styles";
import {Box} from "@mui/material";

const useStyles = makeStyles({
    yAxis: {
        paddingBottom: 50,
        // "&::before":{
        //
        // }
    }
});

export const MyBarChart = () => {
    const month= ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];

    const sellData = useSelector((state) => state.tableData.sellData)
    const myData = sellData.map((el) => {
        return {
            money: (+el.remains * +el.price),
            stack: '',
            month: month[Number(el.lastSale.slice(3,5))-1],
        }
    })


    // const arrrr = sellData.map((el)=> {
    //     return {month: month[Number(el.lastSale.slice(3,5))-1]}
    // })
    console.log(myData.indexOf())

    return (
        <div className={sellData.length > 1 ? styles.content_bar : styles.none}>
            <div className={styles}>
                <h1>Sales Overwiev</h1>
                <h6 className={styles.h6_bar}>graph sales by month</h6>
            </div>
                <BarChart
                    width={500}
                    height={300}
                    barGap={36}
                    data={myData}
                >
                    <XAxis  dataKey="month" />
                    <YAxis stackId='a' dataKey="money" domain={[0, "dataMax" + 500]} padding={{ bottom: 50 }} />
                    <Tooltip  />
                    <Bar stackId='a' dataKey='' barSize={49}  fill="#EFF1FF" background={{ height: 255, fill: "#EFF1FF"}}/>
                    <Bar stackId='a' barSize={49} dataKey= "" fill="#5B6ACD" background={{  height: 200, fill: "#F8F8F8"}}  />
                    <Bar stackId='a' barSize={49} dataKey= "money" fill="#5B6ACD"   />
                </BarChart>
        </div>
    )
}