import { Colors } from '@/constant/colors';
import Link from 'next/link'
import Title from "@/components/Title"
import Subtitle from "@/components/subtitle"
import { Button } from '@/components/ui/button';


const getDetailsById = async (id: any) => {
    try {
        const res = await fetch(`${process.env.API_ROUTE}/api/home/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch information");
        }


        return res.json();
    } catch (error) {
        console.log(error);
    }
};



const Event = () => {
    return (
        <div className="w-full md:w-[400px] h-[400px] border rounded text-center">
            <div className="h-2/5 bg-purple-600 rounded-tl rounded-tr"></div>
            <Subtitle color='text-purple-600' name='Artificial Intelligence' />
        </div>
    )
}

async function About() {

    const detail = await getDetailsById('65fd54cad25c638b64ddf4b5')

    return (
        <div
            style={{ backgroundColor: Colors.bgColor }}
        >
            <div

                className='m-8 '>
                <div className="text-center pt-8">
                    <Title
                        color={Colors.primary} name={detail.home.title} />
                    <p className="text-gray-500 mt-2 mx-8 text-sm">{detail.home.description}</p>
                </div>
                <div className="flex items-center justify-center">
                    <Button
                        style={{ backgroundColor: Colors.blue }}
                        className='md:w-1/5 p-6 bg-purple-600 my-24'>
                        <Link href={'/registry'}>Register your interest</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default About