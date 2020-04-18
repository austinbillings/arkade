import React from 'react'

import { getNetworkIcon, getNetworkUrlPrefix } from 'arkade/utils/social-utils';

export const SocialIcon = ({ networkName, id }) => {
    const icon = getNetworkIcon(networkName)
    const prefix = getNetworkUrlPrefix(networkName)

    const linkProps = {
      target: '_blank',
      href: prefix + id,
      name: `${id} via ${service}`
    }

    return (
        <a {...linkProps}>
            <Icon fa={icon} />
        </a>
    )
}
