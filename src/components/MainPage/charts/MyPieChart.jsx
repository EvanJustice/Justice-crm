import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {Box, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import styles from './Charts.module.css'

export const MyPieChart= () => {
    const [goods, setGoods] = useState([])
    const sellData = useSelector((state) => state.tableData.sellData)
    const randomColor = () =>{
        let a;
        a = '#'+(Math.random().toString(16)+'00000').slice(2,8)
       return a
    }
    const myData = sellData.map((el) => {return {name: el.store + ' ' + el.productName, goods: +el.remains, color: randomColor()} })

    useEffect(()=>{
        setGoods(myData.map((el) => el.name))
    },[sellData])

    return (
        <div className={ sellData.length > 1 ? styles.content__pie : styles.none}>
            <Box sx={sellData.length > 1 ? {display:"flex", alignItems:'center'} : {display:"none"}}>
                <div className={styles.box_pie}>
                <h1 style={{marginBottom:'12px'}}>Amount of sold products by name</h1>
                <PieChart width={200} height={200}>
                    <Pie
                        data={myData}
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="goods"
                    >
                        {myData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                </div>
                <Stack gap={2}>
                   <Box >
                       {myData.map((el,i)=>(
                               <div key={el.color} className={styles.content_pie}>
                                   <Stack key={el.color}
                                          display='flex'
                                          flexDirection='row'
                                          gap='4px'
                                          alignItems='center'
                                          spacing={1}>
                                       <Box sx={{background:el.color, width:10, borderRadius:50, height:10}}/>
                                       <Typography className={styles.typo_pie} >{goods[i]}</Typography>
                                   </Stack>
                                   <hr style={{width:'calc(inherit + 30px)'}}/>
                               </div>
                           ))}
                   </Box>
                </Stack>
            </Box>
        </div>
    );
}
