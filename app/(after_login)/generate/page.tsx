"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import workingGif from '../../../public/HomePage/giphy.gif';
import Logo from '../../../public/Landing_Page_image/Logo.png';
import { usePageContext } from '../story/context/PageContext';
import StoryGenerate from './components/storyGenerate';
import VoiceGenerate from './components/voiceGenerate';
const axios = require('axios');
export default function page() {
    const { pageTitle, pageNumber, setPage } = usePageContext();
    const [storyContext, setStoryContext] = useState<string[]>([]);
    const [onceGone, setOnceGone] = useState(true)
    const [storyScenario, setStoryScenario] = useState<string[]>([]);
    const [completeStory, setCompleteStory] = useState(true)
    const [title, setTitle] = useState('')
    const [totalComplete, setTotalComplete] = useState(0);
    const [totalVComplete, setTotalVComplete] = useState(0);
    const [percentage, setPercentage] = useState(0)
    const [length, setLength] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            if (onceGone) {
                setOnceGone(false);
                try {
                    // Fetch storyPrompt from local storage

                    const storyPrompt = localStorage.getItem('storyPrompt');
                    const style = localStorage.getItem('style');
                    // console.log(storyPrompt);

                    if (storyPrompt) {
                        // Make a POST request with Axios
                        const response = await axios.post('http://localhost:5000/api/story/promptGenerate', { prompt: storyPrompt,style:style });
                        const res = response.data.success
                        // console.log(res)
                        // Handle response
                    //    const  res="**Samira, the Brave Knight**"
                    //    console.log(res)
                        const titleRegex = /Title:\s*(.*)/;
                        const titleMatch = res.match(titleRegex);

                        const lineRegex = /.*\*\*(.*)\*\*/;
                        
                        const match = res.match(lineRegex);



                        if (titleMatch) {
                            const title = titleMatch[1];
                            const cleanedTitle = title.replace(/\*+/g, ''); // Removes all stars
                            setTitle(cleanedTitle);

                            // console.log("Title: ", title);
                            localStorage.setItem('pageTitle', cleanedTitle);

                            setPage(cleanedTitle, 0)
                        } else if (match) {
                            const title = match[1].trim(); // Extracted line
                         
                            setTitle(title);

                            // console.log("Title: ", storyPrompt);
                            localStorage.setItem('pageTitle', title);

                            setPage(title, 0)
                        }
                        else {
                            const title = storyPrompt;
                            setTitle(storyPrompt);

                            // console.log("Title: ", storyPrompt);
                            localStorage.setItem('pageTitle', title);

                            setPage(storyPrompt, 0)
                        }


                        const storyLines = res.split(/\r?\n/).filter(line => line.trim() !== '');
                        if (titleMatch || match) {
                            storyLines.shift();
                        }
                        // console.log("now storyLines is ",storyLines);
                        try {
                            const response = await axios.post('http://localhost:5000/api/story/diffusionGenerate', { story: storyLines,style:style });
                            const story = response.data.success.split(/\r?\n/).filter(line => line.trim() !== '');
                            const stories = story.map(line => line.replace(/^\d+\)\s*/, '').trim());
                            stories.shift();       
                            // console.log("Actual Story lines:", stories);
                            setStoryContext(stories);

                        } catch (error) {
                            console.error('Error fetching diffusion data:', error);
                        }
                        // Remove numbers from each line and trim whitespace
                        const story = storyLines.map(line => line.replace(/^\d+\)\s*/, '').trim());

                        // console.log("Story lines:", story);



                        // Execute the regex on the markdown string

                        // Convert the array string to a JavaScript array
                        // const story = eval(arrayString);
                        // console.log(dataString);
                        setStoryScenario(story);
                        localStorage.setItem('length', story.length);
                        setLength(story.length)
                        setCompleteStory(false);
                        setPercentage(100);

                        // console.log("abcdda adsf ds ", pageTitle);

                    }
                } catch (error) {
                    // Handle error
                    console.error('Error fetching data:', error);
                }
            }

        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on component mount


    return (
        <>
            <div className="section_1_paren " style={{ background: 'linear-gradient(90deg, #F5FCF4 0%, #E5F8E5 100%)', borderBottom: '1px solid white' }}>
                <div className="home_top w-9/12 mx-auto flex justify-between" style={{ padding: '20px 0px' }} >
                    <Image src={Logo} alt='logo' />
                </div>
            </div>
            <div className="section_1_paren flex " style={{ background: 'linear-gradient(90deg, #F5FCF4 0%, #E5F8E5 100%)' }}>
                <div className="home_middle w-5/12 bg-blue-100 mx-auto p-5 my-10 border rounded-xl" >
                    <div className='my-10'>
                        {
                            completeStory && (

                                <>
                                    <div className="loading flex justify-center">
                                        <h2 data-phx-id="m8-phx-F8kp_bAU4MJalYAB" className="text-gray-900 text-3xl font-bold tracking-tight  me-2 font-kid text-lg" style={{ textAlign: 'center', fontWeight: '700', fontSize: '22px' }}>
                                            Title :
                                        </h2>
                                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                        </svg>
                                    </div>

                                </>
                            )
                        }
                        {
                            !completeStory && (
                                <>
                                    <h2 data-phx-id="m8-phx-F8kp_bAU4MJalYAB" className="text-gray-900 text-3xl font-bold tracking-tight font-kid text-lg" style={{ textAlign: 'center', fontWeight: '700', fontSize: '22px' }}>
                                        "{title}"
                                    </h2>
                                </>
                            )
                        }

                    </div>
                    <div className="image flex justify-center">
                        <Image src={workingGif} alt='working' />
                    </div>
                    <div className="progress_txt flex justify-center my-5" >
                        <h2 className="text-gray-900 text-3xl font-bold tracking-tight font-kid " data-phx-id="m5-phx-F8kp_bAU4MJalYAB">
                            Progress
                        </h2>
                    </div>


                    <div className="mt-4 border p-4 rounded-lg bg-gray-50 border-gray-300 shadow-sm my-5">
                        <p className="font-kid text-lg">Text</p>
                        <div className="flex justify-between mb-1 font-medium text-xs text-gray-500">
                            <span className=""></span>
                            <span className="">{percentage}%</span>
                        </div>
                        <div className="w-full h-3 bg-blue-100 bg-opacity-50 rounded-full">
                            <div className="h-3 rounded-full bg-green-500" style={{ width: `${percentage}%` }}>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-6 ">
                        <div className="border p-4 rounded-lg bg-gray-50 border-gray-300 shadow-sm">
                            <h2 className="font-kid text-lg" style={{ textAlign: 'center' }}>Narrator</h2>
                            <div className="space-y-6 mt-4 font-sans">

                                {
                                    completeStory && (

                                        <>
                                            <div className="loading flex justify-center">
                                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                                </svg>
                                            </div>

                                        </>
                                    )
                                }

                                {
                                    storyScenario.map((line, index) => (
                                        <VoiceGenerate key={index} index={index} line={line} title={title} setTotalVComplete={setTotalVComplete}/>
                                    ))
                                }



                            </div>
                        </div>

                        <div className="border p-4 rounded-lg border-gray-300 bg-gray-50 shadow-sm">
                            <h2 className="font-kid text-lg" style={{ textAlign: 'center' }}>Images</h2>


                            <div className="space-y-6 mt-4 font-sans">
                                {
                                    completeStory && (

                                        <>
                                            <div className="loading flex justify-center">
                                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                                </svg>
                                            </div>

                                        </>
                                    )
                                }


                                {
                                    storyContext.map((line, index) => (
                                        <StoryGenerate
                                            key={index}
                                            index={index}
                                            line={line}
                                            title={title}
                                            story={storyScenario}
                                            setTotalComplete={setTotalComplete}
                                        />
                                    ))
                                }

                            </div>
                        </div>
                    </div>


                    {
                        length == totalComplete && length==totalVComplete && (

                            <>
                            <Link href="/story"> 
                                <div className='text-center mb-32 mt-10 flex justify-center items-center '>
                                    <button className="phx-submit-loading:opacity-75  rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring--500 focus:ring-offset-2 ">
                                        Go to Story  <svg className="mt-0.5 ml-2 -mr-1 stroke-indigo-200 stroke-2" fill="none" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                                            <path className="opacity-0 transition group-hover:opacity-100" d="M0 5h7"></path>
                                            <path className="transition group-hover:translate-x-[3px]" d="M1 1l4 4-4 4"></path>
                                        </svg>
                                    </button>
                                </div>
                                </Link>
                            </>
                        )
                    }



                </div>

            </div>
        </>
    )
}
