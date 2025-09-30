import FadeupAnimation from '@/components/FadeupAnimation'
import Heading from '@/components/Heading'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Coffee, Wifi } from 'lucide-react'
import React from 'react'

export default function WhyChooseSkyight() {
    return (
        <section className="py-16 bg-black">
            <div className="container px-4 mx-auto">
                <Heading title={"Why Choose Skyight?"} />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <FadeupAnimation delay={0.1}>
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                                <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
                                <p className="text-muted-foreground">
                                    Round-the-clock customer service for all your travel needs
                                </p>
                            </CardContent>
                        </Card>
                    </FadeupAnimation>
                    <FadeupAnimation delay={0.12}>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Wifi className="w-12 h-12 mx-auto mb-4 text-primary" />
                                <h3 className="mb-2 text-xl font-semibold">Best Prices</h3>
                                <p className="text-muted-foreground">
                                    Compare prices from hundreds of sources to find the best deals
                                </p>
                            </CardContent>
                        </Card>
                    </FadeupAnimation>
                    <FadeupAnimation delay={0.13}>
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Coffee className="w-12 h-12 mx-auto mb-4 text-primary" />
                                <h3 className="mb-2 text-xl font-semibold">Easy Booking</h3>
                                <p className="text-muted-foreground">
                                    Simple and secure booking process in just a few clicks
                                </p>
                            </CardContent>
                        </Card>
                    </FadeupAnimation>
                </div>
            </div>
        </section>
    )
}
