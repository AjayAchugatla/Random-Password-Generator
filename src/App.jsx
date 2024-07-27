import { useState, useCallback, useEffect,useRef } from 'react'

function App() {
  const [len, setLen] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passwd, setPasswd] = useState("");

  const pRef = useRef(null)

  const generator = useCallback(() => {
    let pass = "";
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*():?/|,-_.><[]}{"

    for (let i = 0; i < len; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPasswd(pass);
  }, [len, numAllowed, charAllowed])

  const copyTo = useCallback(()=>{
    pRef.current?.select()
    pRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(passwd)
  },[passwd])

  useEffect(()=>{
    generator();
  },[len,numAllowed,charAllowed,generator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-800"><h1 className='text-white text-center text-2xl mb-3 my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={passwd}
            className="outline-none w-full py-1 px-3"
            placeholder='Password'
            readOnly
            ref={pRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyTo}>
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              min = {6}
              max = {71}
              value={len}
              className='cursor-pointer'
              onChange={(e)=>{setLen(e.target.value)}}
              />
              <label >Length: {len}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={()=>{
                  setNumAllowed((prev)=>!prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>

            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={()=>{
                  setCharAllowed((prev)=>!prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
