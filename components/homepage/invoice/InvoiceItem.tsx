
interface props {
    value: number
    status: number
    time: number
    payer: string
}

const getStatusString = (status: number) => {
    switch (status) {
        case 1:
            return "Confirmed"
        case 2:
            return "Pending"
        case 3:
            return "Declined"
    }
}

const getStatusColor = (status: number) => {
    switch (status) {
        case 1:
            return "text-green-300"
        case 2:
            return "text-yellow-300"
        case 3:
            return "text-red-300"
    }
}

const InvoiceItem = (props: props) => {
    return (
        <div className="col gap-1">
            <div className="row justify-between">
                <div>{props.payer}: ${props.value}</div>

                <div className={`text-xs ${getStatusColor(props.status)}`}>
                    {getStatusString(props.status)}
                </div>
            </div>

            <div className="text-xs text-gray-400">
                Transacted {props.time}s ago
            </div>
        </div>
    )
}

export default InvoiceItem