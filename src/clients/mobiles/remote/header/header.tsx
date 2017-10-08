import * as React from "react";
const styles = require('./header.css')
export interface HeaderProps {
    favicon?: string,
    domain: string
}

export const Header = (props: HeaderProps) => {
    return (
        <div className={styles.siteInfos}>
            <div className={styles.favicon}><img src={props.favicon} alt="" /></div>
            <div className={styles.websiteDomain}>{props.domain}</div>
        </div>)
}
