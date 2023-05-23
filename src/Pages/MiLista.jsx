import React, { useEffect, useState } from 'react'

import AppLayout from './Layouts/AppLayout';



const MiLista = () => {
    const [list, setList] = useState();

    useEffect(() => {
        // localStorage.setItem("list" , [])
        setList(localStorage.getItem("list"))
        // setList(JSON.parse(list))
    },[]);

    console.log(list)
    // console.log(JSON.parse(list))

    return (
        <AppLayout>
            <p>
                {list}
            </p>
        </AppLayout>
    )
}

export default MiLista
