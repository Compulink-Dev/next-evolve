import Evolve from "@/components/Evolve"
import Information from "@/components/Information"
import Layout from "@/components/Layout"
import Mission from "@/components/Mission"
import Objectives from "@/components/Objectives"
import Partners from "@/components/Partner"
import Pricing from "@/components/Pricing"
import Subscribe from "@/components/Subscribe"
import Venue from "@/components/Venue"

function About() {
    return (
        <div className=''>
            <Layout>
                <Information />
                <Evolve />
                <Mission />
                <Venue />
                <Objectives />
                <Pricing />
                <Subscribe />
                <Partners />
            </Layout>
        </div>
    )
}

export default About