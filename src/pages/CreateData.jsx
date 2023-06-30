import React, { useState, useEffect } from 'react';
import { BsPlus, BsSave2Fill } from "react-icons/bs"
import { MdRemoveCircleOutline } from "react-icons/md"


const schema = {
    "product_id": "",
    "title": "",
    "price": "",
    "sku": ""
}

const InputData = () => {
    const [data, setData] = useState([schema])

    const handleAddRow = () => {
        const newData = [...data]
        newData.push(schema)
        setData(newData)
    }

    const handleChange = (e, idx) => {

        const newData = [...data].map((row, index) => {
            if (index === idx) {
                return { ...row, [e.target.name]: e.target.value }
            }
            return row
        })

        setData(newData)
    }

    const handleDelete = (idx) => {
        const arr = [...data].filter((row, index) => {
            console.log(index, idx)
            return index !== idx
        })
        setData(arr)
    }
    const handleSave = async () => {
        if (data.length > 0) {
            await window.services.saveJson(data)
        } else {
            console.log("no data")
        }
    }

    return (
        <div className=' p-5'>
            <div className='flex flex-col justify-between items-center'>
                <div className='px-5 text-right w-full m-3'>
                    <button
                        disabled={data.length === 0}
                        className='btn btn-accent' onClick={handleSave}>
                        <BsSave2Fill />
                        Save data</button>
                </div>
                <div className='px-5  flex flex-col items-center'>

                    {
                        data.map((row, idx) => (
                            <div key={idx}
                                className='relative flex flex-wrap bg-white shadow-lg px-7 py-2 gap-5 rounded my-2 max-w-4xl'
                            >
                                <p className='absolute top-0 left-0 bg-neutral-800 h-full w-5 text-white flex items-center justify-center'>{idx + 1}</p>
                                <input
                                    className="input-sm input-bordered"
                                    name={'product_id'}
                                    placeholder='Product ID'
                                    value={row.product_id}
                                    onChange={(e) => handleChange(e, idx)}
                                >
                                </input>
                                <input
                                    className="input-sm input-bordered "
                                    name={'title'}
                                    placeholder='Product Title'
                                    value={row.title}
                                    onChange={(e) => handleChange(e, idx)}
                                >
                                </input>
                                <input
                                    className="input-sm input-bordered "
                                    name={'price'}
                                    placeholder='Price'
                                    value={row.price}
                                    onChange={(e) => handleChange(e, idx)}
                                >
                                </input>
                                <input
                                    className="input-sm input-bordered "
                                    name={'sku'}
                                    placeholder='SKU'
                                    value={row.sku}
                                    onChange={(e) => handleChange(e, idx)}
                                >
                                </input>

                                <button
                                    className='absolute top-0 right-0 flex justify-center items-center h-full w-6'
                                    onClick={() => handleDelete(idx)}>
                                    <MdRemoveCircleOutline />
                                </button>
                            </div>
                        ))
                    }

                </div>
                <button className='btn mt-10 px-10 min-w-fit w-1/2' onClick={handleAddRow}>
                    <BsPlus />
                    Add row
                </button>

            </div>
        </div>
    );
}

export default InputData;

