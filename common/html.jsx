export const Html = ({ code, ...style }) => (
    <span {...style} dangerouslySetInnerHtml={{ __html: code || '' }} />
)
