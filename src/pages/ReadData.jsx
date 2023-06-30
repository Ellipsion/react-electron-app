import React, { useEffect, useState } from 'react';
import { BiUpload } from "react-icons/bi";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
const schema = {
    "product_id": "",
    "title": "",
    "price": "",
    "sku": ""
}

const ReadData = () => {
    const [file, setFile] = useState('No file selected.')
    const [data, setData] = useState([])
    const [editMode, setEditMode] = useState(false)

    const handleLoadData = async () => {
        const [data, loaded] = await window.services.loadJson()
        if (data && loaded) {
            setData(data.parsedData)
            setFile(data.filePath)
        }
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

    const handleSave = () => {
        if (data.length > 0) {
            window.services.saveJson(data)
        } else {
            console.log("no data")
        }
    }

    return (
        <div className='p-5'>
            <h2 className='text-2xl font-bold p-3'>View and Edit Products</h2>
            <div className='p-4 sticky top-0 bg-white z-10'>
                <div className='flex w-full justify-between '>
                    <div className=' flex rounded border w-fit gap-3 items-center'>
                        <button
                            className='btn  btn-accent'
                            onClick={handleLoadData}>
                            <BiUpload />
                            {data.length > 0 ? "Change file" : "load file"}
                        </button>
                        <p className='px-5'>{file}</p>
                    </div>
                    {
                        data.length > 0 && (
                            <div className='flex gap-3 items-center'>
                                <button
                                    onClick={() => setEditMode(!editMode)}
                                    className='btn'>
                                    {
                                        editMode
                                            ?
                                            <>
                                                <HiMiniViewfinderCircle />
                                                view
                                            </>
                                            :
                                            <>
                                                <AiTwotoneEdit />
                                                edit
                                            </>
                                    }

                                </button>
                                <button
                                    onClick={handleSave}
                                    className='btn btn-neutral'>Save As</button>
                            </div>
                        )
                    }

                </div>
            </div>


            <table className='table'>
                <thead className='shadow-lg bg-white sticky top-20 '>
                    <tr>
                        <th>S. No.</th>
                        <th>ID</th>
                        <th>Product Title</th>
                        <th>Price (INR)</th>
                        <th>SKU</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((row, idx) => (
                            <tr
                                className='hover:text-gray-800 text-gray-500 hover:cursor-pointer'
                                key={row.product_id}>
                                <td>{idx + 1}</td>

                                <td><input
                                    className="input-sm border  disabled:border-none disabled:bg-transparent"
                                    name={'product_id'}
                                    placeholder='Product ID'
                                    value={row.product_id}
                                    onChange={(e) => handleChange(e, idx)}
                                    disabled={!editMode}
                                >
                                </input></td>
                                <td><input
                                    className="input-sm border  disabled:border-none disabled:bg-transparent "
                                    name={'title'}
                                    placeholder='Product Title'
                                    value={row.title}
                                    onChange={(e) => handleChange(e, idx)}
                                    disabled={!editMode}
                                >
                                </input></td>
                                <td><input
                                    className="input-sm border  disabled:border-none disabled:bg-transparent "
                                    name={'price'}
                                    placeholder='Price'
                                    value={row.price}
                                    onChange={(e) => handleChange(e, idx)}
                                    disabled={!editMode}
                                >
                                </input></td>
                                <td><input
                                    className="input-sm border  disabled:border-none disabled:bg-transparent "
                                    name={'sku'}
                                    placeholder='SKU'
                                    value={row.sku}
                                    onChange={(e) => handleChange(e, idx)}
                                    disabled={!editMode}
                                >
                                </input></td>
                                <td className='w-5'>
                                    {
                                        editMode && (
                                            <button
                                                className='text-red-500'
                                                onClick={() => handleDelete(idx)}>
                                                <MdOutlineRemoveCircleOutline />
                                            </button>
                                        )
                                    }

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ReadData;
