import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
interface PdfProps {
    index: number;

    title: string;
}


const PdfGenerate: React.FC<PdfProps> = ({ index, title }) => {
    const [fileContent, setFileContent] = useState('');
    useEffect(() => {
        const fetchFileContent = async () => {

            try {


                const response = await axios.post('http://localhost:5000/api/story/lines', {
                    title: title,
                    id: index
                });

                const content = response.data.fileContent;
                setFileContent(content)

            } catch (error) {
                console.error('Error sending data:', error);
            }
        };

        fetchFileContent();
    }, []);
    return (
        <>
            <div key={index} id={`pdf-page-${index}`} style={{ height: '8.5in', width: '11in' }} className="page mx-auto relative border-b border-2 flex justify-center items-center">
                <div id={`p-${index + 1}`}>
                    <div className="mx-4 grid grid-cols-2 gap-x-12 ">
                        {
                            index % 2 === 0 && (
                                <>
                                    <div className="text-center flex items-center ">
                                        <Image className="mx-auto border-gray-800 border-4 rounded-lg mt-4 md:mt-0" src={`/story/user/${title}/images/${index}.jpg`} alt="image" width={512} height={512} />
                                    </div>
                                    <div style={{ fontSize: '24px', lineHeight: '36.0px' }} className="max-w-prose whitespace-pre-line mx-auto px-4 sm:pt-8 inline-block md:order-first">
                                        <p className="align-middle whitespace-pre-line mx-16 pt-16">{fileContent}</p>
                                    </div>
                                </>
                            )
                        }
                        {
                            index % 2 === 1 && (

                                <>

                                    <div style={{ fontSize: '24px', lineHeight: '36.0px' }} className="text-center flex items-center">
                                        <p className="align-middle whitespace-pre-line mx-16 pt-16">{fileContent}</p>
                                    </div>

                                    <div className=" max-w-prose whitespace-pre-line mx-auto px-4 sm:pt-8 inline-block md:order-first">
                                        <Image className="mx-auto border-gray-800 border-4 rounded-lg mt-4 md:mt-0" src={`/story/user/${title}/images/${index}.jpg`} alt="image" width={512} height={512} />
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>
                <p className="text-center flex justify-center absolute bottom-4">{index + 1}</p>
            </div>
        </>
    )
}
export default PdfGenerate;