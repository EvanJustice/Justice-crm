import styles from './Charts.module.css'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import {useAppSelector} from "../../../../hooks";

export const MyBarChart = () => {
    const month= ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];

    const sellData = useAppSelector((state) => state.tableData.sellData)
    const myData: MyDataType[] = sellData.map((el) => {
        return {
            money_: (+el.remains! * +el.price!),
            stack: '',
            month: month[Number(el.lastSale!.slice(3,5))-1],
        }
    })

    type MyDataType = {
        money_: number
        stack: any
        month: string
    }


    const myData2 = (obj: MyDataType[], prop: string) =>{
        return myData.reduce((acc, el)=> {
            const key: string | undefined = el[prop as keyof object];
            if(!acc[key as keyof object]){
                acc[key as keyof object] = []
            }
            acc[key as keyof typeof acc]?.push(el)
            return acc
        }, {} as { [index: string]: MyDataType[]})
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
                    <XAxis dataKey="month" />
                    <YAxis dataKey="money"
                           domain={[0, "dataMax" + 500]}
                           padding={{bottom: 50}}/>
                    <Tooltip />
                    <Bar stackId='a' dataKey='' barSize={49}  fill="#EFF1FF" background={{ height: 340, fill: "#EFF1FF"}}/>
                    <Bar stackId='a' barSize={49} dataKey= "" fill="#5B6ACD" background={{  height: 280, fill: "#F8F8F8"}}  />
                    <Bar stackId='a' barSize={49} dataKey= "money" fill="#5B6ACD" />
                </BarChart>
        </div>
    )
}