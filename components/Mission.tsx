import React from "react";
import Title from "./Title";
import { Colors } from "@/constant/colors";

const Card = ({ title, desc, paint, bgPaint }: any) => {
  return (
    <div className=" border-2 py-4 px-6 rounded-lg hover:shadow-lg" style={{ borderColor: `${bgPaint}` }}>
      <h1 className="text-lg md:text-2xl font-bold mb-4" style={{ color: `${paint}` }}>{title}</h1>
      <h1 className="text-sm" style={{ color: Colors.text }}>
        {desc}
      </h1>
    </div>
  )
}

function Mission() {
  return (
    <div className="container mx-auto max-w-7xl my-8 px-4">
      <Title name={'Evolve I.C.T Summit Core Values'} color={Colors.primary} />
      <div className="container grid grid-cols-1 md:grid-cols-2 mx-auto max-w-7xl my-8 gap-4">
        <div className="flex flex-col gap-4">
          <Card
            paint={Colors.primary}
            bgPaint={Colors.primary}
            title={'VISION:'}
            desc={' Let’s think about our world, Zimbabwe, Africa. Where we are today and where we would like to be tomorrow and how we can strategize together to get there'}
          />
          <Card
            paint={Colors.red}
            bgPaint={Colors.red}
            title={'INNOVATION:'}
            desc={'It is said you cannot do the same thing and expect a different answer. Let’s think of new ways that we can employ using ICT in order to advance.'}
          />

        </div>
        <div className="flex flex-col gap-4">
          <Card
            paint={Colors.blue}
            bgPaint={Colors.blue}
            title={'RELEVANCE:'}
            desc={'Let’s employ our knowledge and understanding of ICT to appropriately enhance our world and environment in Africa.'}
          />
          <Card
            paint={Colors.orange}
            bgPaint={Colors.orange}
            title={'MENTORSHIP:'}
            desc={'  A good man leaves an inheritance for his children’s children. Let’s impart the wealth of ICT KNOWLEDGE we have to the next generation'}
          />
        </div>
      </div>
    </div>
  );
}

export default Mission;
