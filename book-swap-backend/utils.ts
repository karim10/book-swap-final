

import * as os from 'os';



export function getIpAddress(networkInterface: string = 'wlp3s0')
    : string | undefined {
    const ifaces = os.networkInterfaces();
    let iface: os.NetworkInterfaceInfo[] | undefined;
    Object.keys(ifaces).forEach((ifname) => {
        if (ifname === networkInterface) {
            iface = ifaces[ifname];
        }
    });
    if (iface !== undefined) {
        return iface[0].address;
    }
    return undefined;
}

