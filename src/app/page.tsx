'use client'
import { ArrowRight, CopyCheck, Edit2Icon } from "lucide-react"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'
import { FormEvent, useEffect, useRef, useState } from "react"

interface Chat {
  sender: 'user' | 'ai'
  message: string
}

const Page = () => {
  const [userQuestion, setUserQuestion] = useState('')
  const [chats, setChats] = useState<Chat[]>([])

  const handleChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userQuestion.trim()) {
      alert('Please write your question first.')
      return
    }

    setUserQuestion('')

    setChats(prev => [
      ...prev,
      { sender: 'user', message: userQuestion }
    ])

    try {
      const res = await fetch('/api/ai/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuestion })
      })

      if (!res.ok) {
        console.error('API error', res.statusText)
        return
      }

      const result = await res.json() as { text: string }

      setChats(prev => [
        ...prev,
        { sender: 'ai', message: result.text }
      ])
    } catch (error) {
      console.error(error)
    }
  }

  const chatViewRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatViewRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats.length, chats])

  const [hovered, setHovered] = useState<number | null>()

  const copyChat = async (chat: string) => {
    alert('Text copied Successfully.')
    await navigator.clipboard.writeText(chat)
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  const editChat = (chat: string) => {
    setUserQuestion(chat)
    inputRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const newChat = () => {
    setChats([])
  }


  return (
    <div className="bg-black/90 overflow-x-hidden min-h-[90vh] flex items-center justify-center py-4">
      <div className="w-[80vw]  max-md:w-[90vw] flex flex-col gap-4">
        <div className="flex items-center justify-center gap-3 flex-col">
          <h1 className="font-semibold text-3xl max-sm:text-[1.7em] text-center tracking-wide  text-white"> Hi! I am Rehance, An AI Agent.</h1>
          <h3 className="font-medium text-white tracking-wider max-sm:text-[1.1em] text-lg">
            How can I assist you today ?
          </h3>
        </div>
        <div className="flex flex-col gap-4  min-h-[1vh]">
          {chats.map((chat, i) => (
            <div
              key={i}
              ref={chatViewRef}
              onPointerEnter={() => setHovered(i)}
              onPointerMove={() => setHovered(i)}
              onPointerLeave={() => setHovered(null)}
              className={`flex items-start text-white ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >

              <div
                className="flex gap-2 relative bg-white/10 px-3 max-sm:px-1.5 py-6 max-sm:pt-2 max-sm:pb-6 rounded-xl">
                {hovered == i &&
                  <div className="flex absolute bottom-[2px] right-2  items-center gap-1">
                    <div onClick={() => copyChat(chat.message)} className="transition-all ease-in-out delay-200 duration-500  cursor-pointer bg-black/30 text-white flex items-center gap-1 rounded-2xl px-3 py-1 text-xs">
                      <CopyCheck className="size-4" />
                      Copy
                    </div>
                    <div onClick={() => editChat(chat.message)} className="transition-all ease-in-out delay-200 duration-500  cursor-pointer bg-black/30 text-white flex items-center gap-1 rounded-2xl px-3 py-1 text-xs">
                      <Edit2Icon className="size-4" />
                      Edit
                    </div>
                  </div>
                }
                {chat.sender == 'user' ? <Image
                  src="/mypic.webp"
                  width={32}
                  height={32}
                  alt="avatar"
                  className="rounded-full size-[2em]"
                /> : <p className="text-3xl max-md:text-xl">
                  🤖</p>}
                <div className={`flex ${chat.sender == 'user' ? 'line-clamp-2 overflow-hidden' : 'overflow-x-auto w-full '}  flex-col`}>
                  <ReactMarkdown>
                    {chat.message}
                  </ReactMarkdown>
                </div>

              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleChat} className="flex flex-col items-center justify-center w-full gap-2">
          <div className="flex w-full gap-2">

            <input
              ref={inputRef}
              type="text"
              value={userQuestion}
              onChange={e => setUserQuestion(e.target.value)}
              placeholder="Write your question…"
              className="flex-1 bg-black/30 text-white px-4 py-2 rounded-xl outline-none"
            />
            <button type="submit" className="bg-white p-3 rounded-full">
              <ArrowRight />
            </button>
          </div>
          <button onClick={() => newChat()} disabled={chats.length == 0} className={`px-4 ${chats.length == 0 ? 'disabled:opacity-80 disable: cursor-not-allowed' : 'cursor-pointer' }  py-2 text-[1em] font-semibold tracking-wide rounded-2xl bg-white/20 text-white`}>
            New Chat
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
