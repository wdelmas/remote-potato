import * as React from "react";
const styles = require('./header.css')
export interface HeaderProps {
    favicon?: string,
    title: string
}

export const Header = (props: HeaderProps) => {
    return (
        <div className={styles.siteInfos}>
            <div className="favicon"><img src={props.favicon} alt="" /></div>
            <div className="website-title">{props.title}</div>
        </div>)
}
