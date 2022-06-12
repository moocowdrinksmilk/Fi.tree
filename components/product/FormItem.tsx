
interface props {
    title: string
    inputType?: string
    description?: string
    register: any
    options?: string[]
}

const FormItem = (props: props) => {
    return (
        <div className="col w-full gap-2">
            <h2 className="font-semibold">
                {props.title}
            </h2>

            {
                props.inputType == "textarea" ?
                    <textarea {...props.register} rows={10} className="border-2 border-gray-400 rounded-md p-2"></textarea>
                :
                props.inputType == "select" ?
                    <select className="h-10 w-full border-2 border-gray-400 rounded-md px-2" {...props.register}>
                        {
                            props.options && props.options.map((item, index) => {
                                return (
                                    <option value={item} key={index}>
                                        {item}
                                    </option>
                                )
                            })
                        }
                    </select>
                :
                    <input {...props.register} type={props.inputType ? props.inputType : "text"} className="h-10 w-full border-2 border-gray-400 rounded-md px-2" />
            }

            <div className="text-xs text-gray-500">
                {props.description}
            </div>
        </div>
    )
}

export default FormItem