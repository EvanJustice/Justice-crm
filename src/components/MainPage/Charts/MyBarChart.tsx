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
    const month= ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];

    const sellData = useSelector((state) => state.tableData.sellData)
    const myData = sellData.map((el) => {
        return {
            money_: (+el.remains * +el.price),
            stack: '',
            month: month[Number(el.lastSale.slice(3,5))-1],
        }
    })

    const myData2 = (obj, prop) =>{
        return myData.reduce((acc, el)=> {
            let key = el[prop];
            if(!acc[key]){
                acc[key] = []
            }
            acc[key].push(el)
            return acc
        }, {})
    }
    const myData3 = () => {
        return Object.entries(myData2(myData, 'month'))
            .map((el) =>
        {
            return {
                month: el[0],
                money: el[1].reduce((acc, el) => {
                    return acc + el.money_
                }, 0),
                stack: ''
            }
        })
    }

    return (
        <div className={sellData.length > 1 ? styles.content_bar : styles.none}>
            <div className={styles.titles}>
                <h1>Sales Overwiev</h1>
                <h6 className={styles.h6_bar}>graph sales by month</h6>
            </div>
                <BarChart
                    width={635}
                    height={385}
                    data={myData3()}
                >
                    <XAxis  dataKey="month" />
                    <YAxis stackId='a' dataKey="money" domain={[0, "dataMax" + 500]} padding={{ bottom: 50 }} />
                    <Tooltip  />
                    <Bar stackId='a' dataKey='' barSize={49}  fill="#EFF1FF" background={{ height: 340, fill: "#EFF1FF"}}/>
                    <Bar stackId='a' barSize={49} dataKey= "" fill="#5B6ACD" background={{  height: 280, fill: "#F8F8F8"}}  />
                    <Bar stackId='a' barSize={49} dataKey= "money" fill="#5B6ACD"   />
                </BarChart>
        </div>
    )
}