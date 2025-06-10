import { useState, useRef, useEffect } from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { HiBars3 } from 'react-icons/hi2'
import AuthPanel from '../../AuthPanel/AuthPanel'

const ProfileIcon = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [authPanel, setAuthPanel] = useState(false)
    const dropdownRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative ml-4" ref={dropdownRef}>
            {/* Profile Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex text-2xl gap-3 items-center border rounded-full p-1.5 text-text focus:outline-none hover:border-text border-lightGray transition-all duration-200 cursor-pointer"
                aria-expanded={isOpen}
                aria-label="Profile menu"
            >
                <div className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-400 text-white'>
                    <BsPersonFill />
                </div>
                <HiBars3 className="text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="z-50 absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-lg ">
                    <div className="">
                        <a
                            href='https://agent.skyight.com/login'
                            target='_blank'
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-t-xl transition-colors"
                            onClick={() => {
                                setIsOpen(false)
                                // setAuthPanel(true)
                            }}
                        >
                            Log in
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            My reservations
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-b-xl transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            My favorites
                        </a>
                    </div>
                </div>
            )}
            {authPanel && <div className='fixed flex justify-center items-center inset-0 bg-black/30 z-[999] px-32 py-16' >
                <AuthPanel onClose={() => setAuthPanel(false)} />
            </div>}
        </div>
    )
}

export default ProfileIcon