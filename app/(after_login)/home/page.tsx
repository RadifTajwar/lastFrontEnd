"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '../../../public/Landing_Page_image/Logo.png';
import writing_style from '../../../public/HomePage/writing_style.jpeg'
import art_style from '../../../public/HomePage/art_style.png'
import narrator_style from '../../../public/HomePage/narrator_style.png'
const axios = require('axios');
export default function page() {
  const router = useRouter();
  const [storyPrompt, setStoryPrompt] = useState('');
  const [blankInput, setBlankInput] = useState(false);
  const helpStoryIdeaClicked = () => {
    axios.get('http://localhost:5000/api/story/generate')
      .then(response => {
        // Handle successful response
        let story = response.data.story;
        story = story.replace(/\*/g, '');

        console.log(story);
        setStoryPrompt(story);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
      setBlankInput(false);
  };
  const storyButtonClicked = (e) => {
    e.preventDefault();
    if (storyPrompt.length === 0) {
      setBlankInput(true);
    } else {
      setBlankInput(false);
      // Set storyPrompt in local storage
      localStorage.setItem('storyPrompt', storyPrompt);
      // Navigate to "/generate" route
      router.push('/generate');
    }
    console.log("clicked story button");
  };
  const handlePromptChange = (e) => {

    setStoryPrompt(e.target.value);
  };

  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    setShowOverlay(true);
  };

  return (
    <>
      <div className="section_1_paren " style={{ background: 'linear-gradient(90deg, #F5FCF4 0%, #E5F8E5 100%)', borderBottom: '1px solid white' }}>
        <div className="home_top w-9/12 mx-auto flex justify-between" style={{ padding: '20px 0px' }} >
          <Link href="/"><Image src={Logo} alt='logo' className='cursor-pointer'/></Link>
          
        </div>
      </div>
      <div className="section_1_paren flex h-screen" style={{ background: 'linear-gradient(90deg, #F5FCF4 0%, #E5F8E5 100%)' }}>
        <div className="home_middle w-6/12 bg-blue-100 mx-auto p-5 my-10 border rounded-xl" >
          <form>
            <div className="flex justify-between">
              <h1 className="text-2xl sm:text-4xl text-black font-bold leading-7 tracking-tight">
                What do you want your story to be about?
              </h1>
            </div>
            <div className="mt-4">
              <textarea id="my_story_prompt" name="my_story[prompt]" value={storyPrompt} onChange={handlePromptChange} className="border-zinc-300 focus:border-zinc-400 focus:ring-zinc-800/5 mt-2 block min-h-[6rem] w-full rounded-lg border-zinc-300 py-[7px] px-[11px] text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-800/5 sm:text-sm" required placeholder="A cat who wants to be a flamingo"></textarea>
            </div>

            {
              blankInput && (
                <>

                  <div className="blank_input">
                    <p className="phx-no-feedback:hidden mt-3 flex gap-3 text-sm leading-6 text-rose-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                      </svg>

                      can't be blank
                    </p>
                  </div>
                </>
              )
            }

            <div className="mt-4">
              <button type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring--500 focus:ring-offset-2 " id="inspire-me" onClick={helpStoryIdeaClicked}>
                💡 Help me with a story idea
              </button>
            </div>
            <div className='flex justify-between my-10'>
            <div className="writing">
            <p className="font-bold mt-2 text-lg">Writing</p>
            <button
      onClick={handleClick}
      type="button"
      className="mt-4 relative hover:shadow-xl hover:opacity-90"
    >
      <Image
        src={writing_style}
        className="rounded-md object-fill aspect-w-1"
        alt="Writing Style"
        height="260"
        width="260"
      />
      <p className="absolute bottom-2 left-2 text-white z-10">
        Classic
      </p>
      {showOverlay && (
        /* Overlay component */
        <div id="writing-overlay" className="overlay">
          {/* Overlay content */}
          {/* Transition effects */}
        </div>
      )}
    </button>
            </div>
            <div className="art">
    <p className="font-bold mt-2 text-lg">Art</p>
    <button
      onClick={handleClick}
      type="button"
      className="mt-4 relative hover:shadow-xl hover:opacity-90"
    >
      <Image
        src={art_style}
        className="rounded-md object-fill aspect-w-1"
        alt="art_style"
        height="260"
        width="260"
      />
      <p className="absolute bottom-2 left-2 text-white z-10">
        Classic
      </p>
      {showOverlay && (
        /* Overlay component */
        <div id="writing-overlay" className="overlay">
          {/* Overlay content */}
          {/* Transition effects */}
        </div>
      )}
    </button>
    </div>
    <div className="narrator">
      
    <p className="font-bold mt-2 text-lg">Narrator</p>
    <button
      onClick={handleClick}
      type="button"
      className="mt-4 relative hover:shadow-xl hover:opacity-90"
    >
      <Image
        src={narrator_style}
        className="rounded-md object-fill aspect-w-1"
        alt="narrator_style"
        height="260"
        width="260"
      />
      <p className="absolute bottom-2 left-2 text-white z-10">
        Classic
      </p>
      {showOverlay && (
        /* Overlay component */
        <div id="writing-overlay" className="overlay">
          {/* Overlay content */}
          {/* Transition effects */}
        </div>
      )}
    </button>
    </div> 
    </div>

            <button type='submit' className='submit_button flex justify-center items-center h-10 bg-white mt-5 border rounded-xl w-full' style={{ fontWeight: '600' }} onClick={storyButtonClicked} >Create a Story</button>
          </form>
        </div>
      </div>
    </>
  );
}
