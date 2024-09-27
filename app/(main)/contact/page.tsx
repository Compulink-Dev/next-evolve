// import ContactPage from '@/components/ContactPage'
import Layout from '@/components/Layout'
import React from 'react'
import ContactPage from './_components/contactPage'
import ContactDetails from './_components/contact-page'

function Contact() {
    return (
        <Layout>
            <ContactDetails />
        </Layout>
    )
}

export default Contact