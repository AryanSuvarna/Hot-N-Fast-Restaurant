"use client"

import React from 'react'
import Countdown from 'react-countdown'


const Timer = () => {
    return (
        <Countdown className="font-bold text-3xl md:text-5xl xl:text-7xl text-yellow-500" date={Date.now() + 2 * 24 * 60 * 60 * 1000} />
    )
}

export default Timer