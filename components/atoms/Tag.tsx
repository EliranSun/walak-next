const generateRandomColorByText = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
};

export const Tag = ({children}: { children: string }) => {
    return (
        <span
            style={{backgroundColor: generateRandomColorByText(children)}}
            className="text-xs text-white rounded p-1 grayscale">
            {children}
        </span>
    );
};
