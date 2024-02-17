import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setpassword] = useState("");
  // use Ref hook
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "@#$%&*+-*_~";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setpassword(pass)

  }, [length, numberAllow, charAllow, setpassword]); //optimazation er subidar jonno "setpassword" use kora hoyse  

  const copyPassortToClipboard =  useCallback(() =>{
    passwordRef.current?.select(); // optionally selection kortese
    passwordRef.current?.setSelectionRange(0,32); // user k jodi ekta range er vitor select korar permission dite chai tahole
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => { passwordGenerator() }, [length, numberAllow, charAllow, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-sm rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700 '>
        <div className='flex flex-col shadow rounded-lg overflow-hidden mb-4 py-8  '>
          <p className='text-2xl text-center mb-2 py-1 text-white'>Password Generator</p>
          <div className='flex gap-5 items-center'>
            <input type="text"
              value={password}
              className='outline-none w-full py-1 px-3 rounded'
              placeholder='Password' readOnly ref={passwordRef}
            />
            <button className='outline-none bg-blue-700 hover:bg-blue-900 duration-200 text-white px-3 py-1 rounded shrink-0 cursor-pointer' onClick={copyPassortToClipboard}>Copy</button>
          </div>
        </div>
        <div className='flex text-sm gap-x-2 '>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={32} value={length} className='cursor-pointer' onChange={(e) => { setlength(e.target.value) }} />
            <label className='text-cyan-400 font-semibold'> Length: {length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllow} id='numberInput' onChange={() => {
              setnumberAllow((prev) => !prev)
            }} />
            <label className='text-cyan-400 font-semibold' htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllow} id='characterInput' onChange={() => {
              setcharAllow((prev) => !prev)
            }} />
            <label className='text-cyan-400 font-semibold' htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
