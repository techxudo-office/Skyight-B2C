import React from 'react'
import Heading from '../Heading/Heading'

export default function Trustedby() {
    const imgUrls = [
        "https://dayuse.twic.pics/home/partners/westin.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/staybridge-suites.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/westin.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/staybridge-suites.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/westin.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/staybridge-suites.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/westin.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/staybridge-suites.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/westin.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/staybridge-suites.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/westin.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/staybridge-suites.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/westin.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/staybridge-suites.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/westin.png?twic=v1/cover=256/quality=75",
        "https://dayuse.twic.pics/home/partners/staybridge-suites.png?twic=v1/cover=256/quality=75",
    ]
    return (
        <div className='bg-[#FFFFFF] py-20'>
            <Heading boldTitle={"Trusted By"} className={"text-center"} />
            <div className='container mx-auto flex flex-wrap lg:grid-cols-5'>
                {
                    imgUrls.map((imgUrl, index) => (
                        <div key={index} className='flex max-md:w-32 justify-center items-center p-4 gap-4 mx-auto '>
                            <img src={imgUrl} alt="" className=' object-cover w-full' />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
