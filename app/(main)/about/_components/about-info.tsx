import React from 'react'
import Title from '../../_components/title'

function AboutInfo() {
    return (
        <div className="bg-purple-950 p-8 text-slate-400">
            <div >
                <Title
                    title="Why Evolve I.C.T Summit?"
                />
                <p className="">
                    <span className="font-bold">{"EVOLVE ICT SUMMIT"}{" "}</span>
                    {" has been set up for the purposes of giving back to the"}
                    <span className="font-bold">{" "}{"ICT COMMUNITY AND INDUSTRY"}{" "}</span>
                    {"in Zimbabwe and Africa through the training and equipping of the next generation of ICT professionals and enthusiasts under the gathering of great minds for the purposes of"}
                    <span className="font-bold">{" "}{"WHY EVOLVE ICT SUMMIT?"}{" "}</span>
                    {"imparting, sharing and gaining ICT knowledge skills from one another. There is an African Proverb which says… “If you want to go quickly, go alone. If you want to far, go together” In terms of ICT advancement Africa has a long way to go in order to catch up with the rest of the world."}
                    <span className="font-bold">{" "}{"EVOLVE ICT SUMMIT"}{" "}</span>
                    {"is providing a platform for the African Continent to unite under the banner of shared knowledge for the purposes of ICT advancement on the African Continen"}
                </p>
            </div>
            <div className="">
                <Title
                    title="IMPLEMENTATION OF EVOLVE ICT SUMMIT"
                />
                <p className="">
                    <span className="font-bold">
                        {" THEME OF EVOLVE ICT SUMMIT 2023"}{" "}
                    </span>
                    {"There is a saying which says “Without vision a people will perish” We believe what Africa needs more than anything is vision - the ability to look to the future and plan for it adequately. As such the chosen theme for the inaugural Evolve ICT Summit is…"}
                    <span className="font-bold">{" "}{"LEAD WITH VISION"}{" "}</span>
                </p>
            </div>
        </div>
    )
}

export default AboutInfo