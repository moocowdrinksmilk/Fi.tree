import Link from 'next/link'
interface props {
    icon: React.ReactNode
    name: string
    link: string
}

const SideBarNavItem = (props: props) => {
    return (
        <Link href={props.link}>
            <div className="row gap-4 pl-6 items-center cursor-pointer hover:bg-gray-200 py-6">
                {props.icon}
                <span className="text-lg">
                    {props.name}
                </span>
            </div>
        </Link>
    )
}

export default SideBarNavItem