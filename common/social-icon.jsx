import React from 'react'

import { Icon } from './icon'
import { getNetworkIcon, getNetworkUrlPrefix } from '../utils/social-utils'

export const SocialIcon = ({ networkName, id, url }) => {
    const icon = getNetworkIcon(networkName)
    const prefix = getNetworkUrlPrefix(networkName)

    const linkProps = {
        className: 'ak-social-icon',
        target: '_blank',
        href: url ? url : prefix + id,
        name: `${id} via ${networkName}`
    }

    return (
        <a {...linkProps}>
            <Icon fa={icon} />
        </a>
    )
}
