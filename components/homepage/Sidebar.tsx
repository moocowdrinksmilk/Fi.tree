import Image from 'next/image'
import SideBarNavItem from './SideBarNavItem'
import { FiHome, FiBox, FiClock, FiBarChart} from 'react-icons/fi'


const SideBar = () => {
    return (
        <div className="col w-44 h-screen justify-between">
            <div className="py-4 col">
                <div className="h-20 relative mb-10">
                    <Image src='/logo.png' layout="fill" objectFit="contain" />
                </div>

                <SideBarNavItem link="/dashboard" icon={<FiHome size={30} />} name="Home" />
                <SideBarNavItem link="/product" icon={<FiBox size={30} />} name="Products" />
                <SideBarNavItem link="/balances"  icon={<FiClock size={30} />} name="Balances"/>
                <SideBarNavItem link="/analysis"  icon={<FiBarChart size={30} />} name="Analysis"/>
            </div>
        </div>
    )
}

export default SideBar