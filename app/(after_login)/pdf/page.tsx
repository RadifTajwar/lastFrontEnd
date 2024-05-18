// MyPage.js
"use client"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import Pdf from './component/pdf';

const MyPage = () => {
    const [length, setLength] = useState(0);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const storedLength = localStorage.getItem('length');
        const storedTitle = localStorage.getItem('pageTitle');
        if (storedLength) {
            setLength(parseInt(storedLength, 10));
        }
        if (storedTitle) {
            setTitle(storedTitle);
        }
    }, []);
    const PdfDownload = async () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'in',
            format: [8.5, 11]
        });
    
        // Add title to the first page
        const titleElement = document.getElementById('title');
        if (titleElement) {
            console.log("here we are")
            console.log(titleElement)
            await html2canvas(titleElement).then((canvas) => {
                const imageData = canvas.toDataURL('image/png');
                const imgProps = doc.getImageProperties(imageData);
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
                doc.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            });
        }
    
        // Add content pages
        for (let index = 0; index < length; index++) {
            const element = document.getElementById(`pdf-page-${index}`);
            if (element) {
                await html2canvas(element).then((canvas) => {
                    const imageData = canvas.toDataURL('image/png');
                    const imgProps = doc.getImageProperties(imageData);
                    const pdfWidth = doc.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
                    if (index > 0 || !titleElement) {
                        doc.addPage();
                    }
    
                    doc.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                });
            }
        }
    
        doc.save(`${title}.pdf`);
    };
    
    return (
        <>
            <div className="my-page" id='my-page'>
                <div style={{ height: '8.5in', width: '11in' }} className="items-center justify-center flex text-center mx-auto border-2">
                    <h1 id="title" className="text-5xl px-12 mb-12">
                        {title}
                    </h1>
                </div>
                {Array.from({ length }, (_, index) => (
                    <Pdf
                        key={index}
                        index={index}
                        title={title}
                    />
                ))}
            </div>
            <div className='flex justify-center my-5'>
                <button
                    className="justify-center rounded-lg bg-indigo-800 text-white hover:bg-indigo-700 py-3 px-3 text-sm font-semibold leading-6 inline-flex font-sans mr-3 items-center text-base rounded-md"
                    style={{ textAlign: 'center', fontSize: '17px' }}
                    onClick={PdfDownload}
                >
                    <span className='me-2'>
                        <svg width="15" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4167 0H2.08333C1.5308 0 1.00089 0.219493 0.610194 0.610194C0.219493 1.00089 0 1.5308 0 2.08333V18.75C0 19.3025 0.219493 19.8324 0.610194 20.2231C1.00089 20.6138 1.5308 20.8333 2.08333 20.8333H14.5833C15.1359 20.8333 15.6658 20.6138 16.0565 20.2231C16.4472 19.8324 16.6667 19.3025 16.6667 18.75V6.25L10.4167 0ZM14.5833 18.75H2.08333V2.08333H9.375V7.29167H14.5833V18.75Z" fill="white" />
                        </svg>
                    </span>
                    Download PDF
                </button>
            </div>
        </>
    );
};

export default MyPage;
