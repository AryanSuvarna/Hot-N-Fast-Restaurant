import React from 'react'

const ContactPage = () => {
    return (
        <div className='p-8 shadow-2xl m-8 rounded-sm'>
            <h1 className='text-3xl font-bold underline pb-5'>Contact Page</h1>
            <div className="flex flex-col md:flex-row gap-4">
                {/* Address container*/}
                <div className="flex-1">
                    <h2 className="font-bold text-2xl">Address</h2>
                    <p>1 Adelaide St. East</p>
                    <p>Toronto, ON M5C 2V9</p>
                    {/* Map container */}
                    <div >
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1020.675173828706!2d-79.37890745255788!3d43.65013759906797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb32f1ea2597%3A0x1961c431093a67eb!2s1%20Adelaide%20St%20E%2C%20Toronto%2C%20ON%20M5C%202V9!5e0!3m2!1sen!2sca!4v1703528893411!5m2!1sen!2sca" loading="lazy" className='mt-4 w-full h-96 md:hidden' ></iframe>
                    </div>

                </div>
                {/* Contact container*/}
                <div className="flex-1">
                    <h2 className="font-bold text-2xl">Contact</h2>
                    <p>Phone: 555-555-5555</p>
                    <p>Email: example@gmail.com
                        <a href="mailto:example@gmail.com" className="underline" />
                    </p>
                </div>
                {/* Hours container*/}
                <div className="flex-1">
                    <h2 className="font-bold text-2xl">Hours</h2>
                    <p>Monday - Friday: 10am - 10pm</p>
                    <p>Saturday: 12pm - 10pm</p>
                    <p>Sunday: Closed</p>
                </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1020.675173828706!2d-79.37890745255788!3d43.65013759906797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb32f1ea2597%3A0x1961c431093a67eb!2s1%20Adelaide%20St%20E%2C%20Toronto%2C%20ON%20M5C%202V9!5e0!3m2!1sen!2sca!4v1703528893411!5m2!1sen!2sca" loading="lazy" className='hidden md:block md:w-full md:h-96 mt-6'></iframe>
        </div>
    )
}

export default ContactPage