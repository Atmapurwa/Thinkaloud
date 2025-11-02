"use client"

import { useState } from "react"

interface FAQItem {
    question: string
    answer: string
}

const faqData: FAQItem[] = [
    {
        question: "What is Thinkaloud?",
        answer:
            "Thinkaloud is an AI-powered reading and voice learning platform that helps dyslexic and diverse learners read, listen, and think critically through interactive, accessible technology.",
    },
    {
        question: "Who can use this app?",
        answer:
            "Our platform is designed for students, educators, and schools especially those supporting learners with dyslexia, reading challenges, or diverse learning needs.",
    },
    {
        question: "How does the AI reading support work?",
        answer:
            "The AI reads text aloud with natural voices, highlights words in sync, and offers comprehension questions or real-time voice interactions to improve understanding and engagement.",
    },
    {
        question: "Can teachers create their own reading and speaking activities?",
        answer:
            "Yes! Educators can easily create, assign, and assess interactive reading and conversation activities with AI-generated feedback.",
    },
    {
        question: "Is it accessible for dyslexic or visually impaired users?",
        answer:
            "Yes. The platform includes dyslexia-friendly fonts, customizable color contrast, word-by-word highlighting, and full text-to-speech and voice input support.",
    },
    {
        question: "What is included in the free plan?",
        answer:
            "The Starter plan includes core AI reading features such as read & listen mode, highlighting, and basic accessibility tools. Perfect for trying the app before upgrading to professional or enterprise features.",
    },
]

function ChevronDownIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function FAQSection() {
    const [openItems, setOpenItems] = useState<number[]>([])

    const toggleItem = (index: number) => {
        setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    return (
        <div className="w-full flex justify-center items-start">
            <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
                {/* Left Column - Header */}
                <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
                    <div className="w-full flex flex-col justify-center text-[#49423D] font-semibold leading-tight md:leading-11 font-sans text-4xl tracking-tight">
                        Frequently Asked Questions
                    </div>
                    <div className="w-full text-[#605A57] text-base font-normal leading-7 font-sans">
                        Everything you need to know about Thinkaloud
                    </div>
                </div>

                {/* Right Column - FAQ Items */}
                <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
                    <div className="w-full flex flex-col">
                        {faqData.map((item, index) => {
                            const isOpen = openItems.includes(index)

                            return (
                                <div key={index} className="w-full border-b border-[rgba(73,66,61,0.16)] overflow-hidden">
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-[rgba(73,66,61,0.02)] transition-colors duration-200"
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex-1 text-[#49423D] text-base font-medium leading-6 font-sans">
                                            {item.question}
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <ChevronDownIcon
                                                className={`w-6 h-6 text-[rgba(73,66,61,0.60)] transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
                                                    }`}
                                            />
                                        </div>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="px-5 pb-[18px] text-[#605A57] text-sm font-normal leading-6 font-sans">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
