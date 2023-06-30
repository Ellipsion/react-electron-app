import React, { useState } from 'react';

const { openLink } = window.services;

const Info = () => {
    const [showMessage, setShowMessage] = useState(true);
    return (
        <>

            <button onClick={() => setShowMessage(!showMessage)} className=' fixed btn-neutral shadow-lg bottom-10 right-10 z-30 btn btn-circle'>?</button>
            {
                showMessage && (
                    <>
                        <div onClick={() => setShowMessage(false)} className='fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-sm z-30'></div>
                        <button className='text-left cursor-default bg-gray-100 shadow-md rounded-md absolute w-2/5 max-w-[400px] right-10 bottom-24 p-5 overflow-y-auto h-[70%] max-h-[500px] font-medium z-50'>
                            <h3 className='text-lg font-bold'>Hello, I am Ashish Kumawat,</h3>
                            <p className='font-semibold'>You can find me <button className="btn btn-sm" onClick={() => openLink("https://ellipsion-portfolio-ellipsion.vercel.app/")}>here</button>.</p>

                            <p className='mt-5 text-md first-letter:font-semibold'>
                                1. The <button className='btn btn-sm btn-neutral'> create new products</button>  button creates mulitple products with the schema mentioned
                                in the assignment.
                            </p>
                            <div className='bg-blue-950 rounded m-2 p-5 text-orange-500 font-semibold'>
                                <p>{"{"}</p>
                                <p className='ml-3'>"product_id": 654321,</p>
                                <p className='ml-3'>"title": “Product A”,</p>
                                <p className='ml-3'>"price": "15000.00",</p>
                                <p className='ml-3'>"sku": "1307A 0101000"</p>
                                <p>{"}"}</p>
                            </div>
                            <p>

                                You can create products and save that in a json file by clicking on the <button className='btn btn-sm btn-accent'>save data</button> button.
                                <br />
                                The native dialog window will ensure that you can save only in .json format.
                            </p>

                            <p className='mt-5 first-letter:font-bold'>

                                2. The <button className='btn btn-sm btn-neutral'>view and edit products</button> button will take you to the view and edit page.
                                <br />
                                <br />
                                here you can load the json file previously created and edit the data which is displayed in a tabular UI,
                                as mentioned in the assignment.
                            </p>
                            <p>
                                <br />
                                The <button className='btn btn-accent btn-sm'>load file</button> function will ensure that only correct schema is loaded and hence <button className='btn btn-sm btn-warning'>schema checking</button>
                                is applied in the electron.js file.
                            </p>

                        </button>
                    </>
                )
            }
        </>
    );
}

export default Info;
