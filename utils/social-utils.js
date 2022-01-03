import { isNonEmptyString, isObject } from './type-utils';

const NETWORKS = {
    facebook: { icon: 'facebook', urlPrefix: 'https://www.facebook.com/' },
    instagram: { icon: 'instagram', urlPrefix: 'https://www.instagram.com/' },
    twitter: { icon: 'twitter', urlPrefix: 'https://www.twitter.com/' },
    soundcloud: { icon: 'soundcloud', urlPrefix: 'https://www.soundcloud.com/' },
    facebook: { icon: 'facebook', urlPrefix: 'https://www.facebook.com/' },
    youtube: { icon: 'youtube-play', urlPrefix: 'https://www.youtube.com/channel/' },
    spotify: { icon: 'spotify', urlPrefix: 'https://open.spotify.com/artist/' },
    email: { icon: 'envelope-square', urlPrefix: 'mailto:' },
    default: { icon: 'globe', urlPrefix: '' }
};

export function getNetworkIcon (networkName) {
    if (!isNonEmptyString(networkName))
        return;

    return Object.keys(NETWORKS).includes(networkName.toLowerCase())
        ? NETWORKS[networkName.toLowerCase()].icon
        : networkName;
};

export function getNetworkUrlPrefix (networkName) {
    if (!isNonEmptyString(networkName))
        return;

    return Object.keys(NETWORKS).includes(networkName.toLowerCase())
        ? NETWORKS[networkName.toLowerCase()].urlPrefix
        : NETWORKS.default.urlPrefix;
};

export function networkMapToList (map) {
    if (!isObject(map))
        return map;

    const networkNames = Object.keys(map);

    return networkNames.map(networkName => {
        const id = map[networkName];

        return { networkName, id };
    });
}
