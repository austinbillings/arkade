export const Html = ({ code, ...style }) => (
    <span {...style} dangerouslySetInnerHTML={{ __html: code || '' }} />
)
