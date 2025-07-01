interface StatusTagProps {
    title: string;
    titleColor: string;
    borderColor: string;
}

const StatusTag = ({ title, titleColor, borderColor }: StatusTagProps) => {
    return (
        <span
            className="status-tag"
            style={{
                color: titleColor,
                borderColor: borderColor,
            }}
        >
            {title}
        </span>
    )
}

export default StatusTag;