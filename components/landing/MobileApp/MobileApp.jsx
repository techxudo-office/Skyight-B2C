import React from 'react'

export default function MobileApp() {
    return (
        <div className='container mx-auto  py-10 my-20 relative'>
            <div className='lg:bg-white lg:max-w-6xl mx-auto rounded-xl p-4 md:p-10 lg:p-20 relative lg:shadow-lg'>
                <div className="flex flex-col w-full md:max-w-xl justify-center py-5  lg:py-10 z-10 relative">
                    <h1 className="text-6xl font-bold mb-4 leading-tight">Book and go with our free travel app</h1>
                    <p className="text-lightGray text-xl mb-6">It’s more practical and convenient to manage our services through. applications that you can download on the following platforms.
                        .</p>
                    <div className="flex gap-4">
                        <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-lg">App Store</a>
                        <a href="#" className="bg-green-500 text-white px-4 py-2 rounded-lg">Google Play</a>
                    </div>
                </div>
                <img className='absolute top-0 left-0 max-lg:hidden' src="https://cdn.prod.website-files.com/62de594671a90a6e29862a32/62e23c8d74e6f4dff1ffd213_leaf-2.webp" alt="" />
                <img className='absolute top-0 right-0 rotate-180 max-lg:hidden' src="https://cdn.prod.website-files.com/62de594671a90a6e29862a32/62e23cf3f25237314ee5d0c9_leaf-1.webp" alt="" />
                <img className='absolute bottom-0 right-0 rotate-180 max-lg:hidden' src="https://cdn.prod.website-files.com/62de594671a90a6e29862a32/62e23c8d74e6f4dff1ffd213_leaf-2.webp" alt="" />
                <img className='absolute bottom-0 left-0 max-lg:hidden ' src="https://cdn.prod.website-files.com/62de594671a90a6e29862a32/62e23cf3f25237314ee5d0c9_leaf-1.webp" alt="" />

            </div>
            <img src="https://cdn.prod.website-files.com/62de594671a90a6e29862a32/62e237d45e37fa233bbb5e2f_iphone.webp" alt="" className=' max-lg:mx-auto max-lg:h-96 lg:absolute top-0 right-44 h-full' />

        </div>
    )
}
